import React, { createContext, useContext, useEffect, useState } from "react"
import { createRef } from "react"
import Draggable from "react-draggable"

const CloserContext = createContext(null)

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

    const isCloserToRightEdge = useContext(CloserContext)

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

    const isCloserToRightEdge = useContext(CloserContext)

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

    const isCloserToRightEdge = useContext(CloserContext)

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
        <Draggable nodeRef={nodeRef} onStop={handleDragEnd}>
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
                                onMouseDown={(e) => e.stopPropagation()}
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
    const canvasRef = createRef()

    function handleChange() {}

    function handleParentChange() {
        setParentIsOn(!parentIsOn)
        handleChange()
    }

    function isCloserToRightEdge(e) {
        const dropPosition = e.clientX
        const windowWidth = canvasRef.current.clientWidth

        console.debug(`dropPosition: ${dropPosition}`)
        console.debug(`windowWidth: ${windowWidth}`)

        if (dropPosition > windowWidth / 2) {
            return true
        } else {
            return false
        }
    }

    return (
        <div ref={canvasRef} className="flex flex-col m-4 space-y-4">
            <CloserContext.Provider value={isCloserToRightEdge}>
                <UseEffectToggle onChange={handleChange} />
                <FunctionToggle onChange={handleChange} />
                <ParentToggle onChange={handleParentChange} isOn={parentIsOn} />
            </CloserContext.Provider>
        </div>
    )
}
