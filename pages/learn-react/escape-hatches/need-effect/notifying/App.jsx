import React, { useEffect, useState } from "react"
import Draggable from "react-draggable"

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
    function isCloserToRightEdge(e) {
        const dropPosition = e.clientX
        const windowWidth = e.target.parentElement.clientWidth
        if (dropPosition > windowWidth / 2) {
            return true
        } else {
            return false
        }
    }

    return (
        <AbstractToggle
            isOn={isOn}
            handleClick={handleClick}
            handleDragEnd={handleDragEnd}
            name="Toggle using useEffect"
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
            name="Toggle using a function"
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
            name="Toggle in parent"
        />
    )
}

function AbstractToggle({ isOn, handleClick, handleDragEnd, name }) {
    const nodeRef = React.useRef(null)
    return (
        <Draggable onStop={handleDragEnd}>
            <div ref={nodeRef} className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>
                        The amazing feature you requested is:{" "}
                        {isOn ? "on" : "off"}
                    </p>
                    <div className="card-actions justify-end">
                        <label className="label cursor-pointer">
                            <input
                                type="checkbox"
                                className="toggle"
                                checked={isOn}
                                onChange={handleClick}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </Draggable>
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
        <div className="flex flex-col m-4 space-y-4">
            <UseEffectToggle onChange={handleChange} />
            <FunctionToggle onChange={handleChange} />
            <ParentToggle onChange={handleParentChange} isOn={parentIsOn} />
        </div>
    )
}
