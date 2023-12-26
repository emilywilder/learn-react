import { useState } from "react"

function UseEffectToggle({ onChange }) {
    const [isOn, setIsOn] = useState(false)

    // 🔴 Avoid: The onChange handler runs too late
    useEffect(() => {
        onChange(isOn)
    }, [isOn, onChange])

    function handleClick() {
        setIsOn(!isOn)
    }

    function handleDragEnd(e) {
        if (isCloserToRightEdge(e)) {
            setIsOn(true)
        } else {
            setIsOn(false)
        }
    }

    // ...
}

function FunctionToggle({ onChange }) {
    const [isOn, setIsOn] = useState(false)

    function updateToggle(nextIsOn) {
        // ✅ Good: Perform all updates during the event that caused them
        setIsOn(nextIsOn)
        onChange(nextIsOn)
    }

    function handleClick() {
        updateToggle(!isOn)
    }

    function handleDragEnd(e) {
        if (isCloserToRightEdge(e)) {
            updateToggle(true)
        } else {
            updateToggle(false)
        }
    }

    // ...
}

// ✅ Also good: the component is fully controlled by its parent
function ParentToggle({ isOn, onChange }) {
    function handleClick() {
        onChange(!isOn)
    }

    function handleDragEnd(e) {
        if (isCloserToRightEdge(e)) {
            onChange(true)
        } else {
            onChange(false)
        }
    }

    // ...
}

export default function App() {}
