import { useRef, useState } from "react"

export default function Toggle() {
    const isOnRef = useRef(false)
    const [isOn, setIsOn] = useState(false)

    return (
        <button onClick={() => {
            setIsOn(!isOn)
        }}>
            {isOn ? 'On' : 'Off'}
        </button>
    )
}