import { useRef, useState } from "react"

export default function Chat() {
    const [text, setText] = useState('')
    const textRef = useRef(text)

    function handleSend() {
        setTimeout(() => {
            alert('Sending: ' + textRef.current)
        }, 3000)
    }

    return (
        <>
            <input
                value={text}
                onChange={e => {
                    textRef.current = e.target.value
                    setText(textRef.current)
                }}
            />
            <button onClick={handleSend}>
                Send
            </button>
        </>
    )
}