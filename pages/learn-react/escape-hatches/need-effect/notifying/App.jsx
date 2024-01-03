import React, { createContext, useContext, useEffect, useState } from "react"
import { createRef } from "react"
import Draggable from "react-draggable"

const CanvasContext = createContext(null)

function droppedOnRightSide(x, width) {
    console.debug(`dropPosition: ${x}`)
    console.debug(`windowWidth: ${width}`)

    return x > width / 2
}

function UseEffectToggle({ onChange }) {
    const [isOn, setIsOn] = useState(false)
    const [x, setX] = useState(0)

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

    const canvasRef = useContext(CanvasContext)

    function isCloserToRightEdge(e) {
        const dropPosition = x
        const windowWidth = canvasRef.current.clientWidth
        // debugger

        return droppedOnRightSide(dropPosition, windowWidth)
    }

    return (
        <AbstractToggle
            x={x}
            setX={setX}
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

    const canvasRef = useContext(CanvasContext)

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

    const canvasRef = useContext(CanvasContext)

    return (
        <AbstractToggle
            isOn={isOn}
            handleClick={handleClick}
            handleDragEnd={handleDragEnd}
            name="Toggle in parent"
        />
    )
}

function AbstractToggle({ isOn, handleClick, handleDragEnd, name, x, setX }) {
    const nodeRef = React.useRef(null)
    return (
        <Draggable
            nodeRef={nodeRef}
            onStop={handleDragEnd}
            onDrag={({ movementX }) => setX(x + movementX)}
        >
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

    return (
        <div ref={canvasRef} className="flex flex-col m-4 space-y-4">
            <CanvasContext.Provider value={canvasRef}>
                <UseEffectToggle onChange={handleChange} />
                <FunctionToggle onChange={handleChange} />
                <ParentToggle onChange={handleParentChange} isOn={parentIsOn} />
            </CanvasContext.Provider>
        </div>
    )
}
