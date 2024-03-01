import { useEffect, useRef } from "react";

export default function MyInput({ shouldFocus, value, onChange }) {
    const ref = useRef(null)

    useEffect(() => {
        shouldFocus && ref.current.focus()
    }, [shouldFocus])

    return (
        <input
            ref={ref}
            value={value}
            onChange={onChange}
        />
    )
}