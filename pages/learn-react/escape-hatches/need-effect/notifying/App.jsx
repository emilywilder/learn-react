import React, { useEffect, useState } from "react"

function isCloserToRightEdge(e) {
    return true
}

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
    return (
        <AbstractToggle
            isOn={isOn}
            handleClick={handleClick}
            handleDragEnd={handleDragEnd}
            name={UseEffectToggle.name}
        />
    )
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
    return (
        <AbstractToggle
            isOn={isOn}
            handleClick={handleClick}
            handleDragEnd={handleDragEnd}
            name={FunctionToggle.name}
        />
    )
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
    return (
        <AbstractToggle
            isOn={isOn}
            handleClick={handleClick}
            handleDragEnd={handleDragEnd}
            name={ParentToggle.name}
        />
    )
}

function AbstractToggle({ isOn, handleClick, handleDragEnd, name }) {
    return (
        <div className="form-control w-44">
            <label className="label cursor-pointer">
                <span className="label-text">{name}</span>
                <input
                    type="checkbox"
                    className="toggle"
                    checked={isOn}
                    onChange={handleClick}
                />
            </label>
        </div>
    )
}

export default function App() {
    const [parentIsOn, setParentIsOn] = useState(false)

    function handleChange() {}

    function handleParentChange() {
        setParentIsOn(!parentIsOn)
        handleChange()
    }

    return (
        <div className="flex flex-col m-4">
            <UseEffectToggle onChange={handleChange} />
            <FunctionToggle onChange={handleChange} />
            <ParentToggle onChange={handleParentChange} isOn={parentIsOn} />
        </div>
    )
}
