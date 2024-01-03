import React, { createContext, useContext, useEffect, useState } from "react"
import { createRef } from "react"
import Draggable from "react-draggable"

const CanvasContext = createContext(null)

function draggedToRightSide(x, toggleWidth, canvasWidth) {
    return x + toggleWidth / 2 > canvasWidth / 2
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
    const [x, setX] = useState(0)
    const [toggleWidth, setToggleWidth] = useState()
    const canvasRef = useContext(CanvasContext)

    function isCloserToRightEdge(e) {
        return draggedToRightSide(x, toggleWidth, canvasRef.current.clientWidth)
    }

    return (
        <AbstractToggle
            x={x}
            setX={setX}
            isOn={isOn}
            handleClick={handleClick}
            handleDragEnd={handleDragEnd}
            name="Toggle using useEffect"
            setToggleWidth={setToggleWidth}
            isCloserToRightEdge={isCloserToRightEdge}
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

    const [x, setX] = useState(0)
    const [toggleWidth, setToggleWidth] = useState()
    const canvasRef = useContext(CanvasContext)

    function isCloserToRightEdge(e) {
        return draggedToRightSide(x, toggleWidth, canvasRef.current.clientWidth)
    }

    return (
        <AbstractToggle
            x={x}
            setX={setX}
            isOn={isOn}
            handleClick={handleClick}
            handleDragEnd={handleDragEnd}
            name="Toggle using a function"
            setToggleWidth={setToggleWidth}
            isCloserToRightEdge={isCloserToRightEdge}
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

    const [x, setX] = useState(0)
    const [toggleWidth, setToggleWidth] = useState()
    const canvasRef = useContext(CanvasContext)

    function isCloserToRightEdge(e) {
        return draggedToRightSide(x, toggleWidth, canvasRef.current.clientWidth)
    }

    return (
        <AbstractToggle
            x={x}
            setX={setX}
            isOn={isOn}
            handleClick={handleClick}
            handleDragEnd={handleDragEnd}
            name="Toggle in parent"
            setToggleWidth={setToggleWidth}
            isCloserToRightEdge={isCloserToRightEdge}
        />
    )
}

function AbstractToggle({
    isOn,
    handleClick,
    handleDragEnd,
    name,
    x,
    setX,
    setToggleWidth,
    isCloserToRightEdge,
}) {
    const [dragging, setDragging] = useState(false)
    const nodeRef = React.useRef(null)
    let dragClassNames = ""

    if (dragging) {
        dragClassNames = isCloserToRightEdge()
            ? "bg-gradient-to-r from-white to-green-100"
            : "bg-gradient-to-l from-white to-red-100"
    }
    return (
        <Draggable
            nodeRef={nodeRef}
            onStop={(e) => {
                setDragging(false)
                handleDragEnd(e)
            }}
            onMouseDown={() => setToggleWidth(nodeRef.current.clientWidth)}
            onDrag={({ movementX }) => {
                setDragging(true)
                setX(x + movementX)
            }}
        >
            <div
                ref={nodeRef}
                className={`card w-96 bg-base-100 shadow-xl  ${dragClassNames}`}
            >
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

    function handleParentChange(e) {
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
