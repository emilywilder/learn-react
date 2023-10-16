import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const MyInput = forwardRef((props, ref) => {
    const realInputRef = useRef(null)
    useImperativeHandle(ref, () => ({
        focus() {
            realInputRef.current.focus()
        }
    }))
    return <input {...props} ref={realInputRef} />
})

export default function MyForm() {
    const inputRef = useRef(null)
    const [errorMsg, setErrorMsg] = useState('')

    function handleClickFocus() {
        setErrorMsg('')
        inputRef.current.focus()
    }

    function handleClickBlur() {
        setErrorMsg('')
        try {
            inputRef.current.blur()
        } catch(err) {
            setErrorMsg(err.message)
        }
    }

    return (
        <>
            <MyInput ref={inputRef} />
            <button onClick={handleClickFocus}>
                Focus the input
            </button>
            <button onClick={handleClickBlur}>
                Blur the input
            </button>
            {errorMsg &&
                <div className="error">
                    {errorMsg}
                </div>
            }
        </>
    )
}