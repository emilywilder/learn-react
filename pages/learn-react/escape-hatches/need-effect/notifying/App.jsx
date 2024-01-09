import React, { createContext, useContext, useEffect, useState } from "react"
import { createRef } from "react"
import Draggable from "react-draggable"

const CardContext = createContext(null)

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
    const isCloserToRightEdge = useContext(CardContext)

    return (
        <RenderToggle
            isOn={isOn}
            handleClick={handleClick}
            handleDragEnd={handleDragEnd}
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
    const isCloserToRightEdge = useContext(CardContext)

    return (
        <RenderToggle
            isOn={isOn}
            handleClick={handleClick}
            handleDragEnd={handleDragEnd}
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
    const isCloserToRightEdge = useContext(CardContext)

    return (
        <RenderToggle
            isOn={isOn}
            handleClick={handleClick}
            handleDragEnd={handleDragEnd}
        />
    )
}

function RenderToggle({ isOn, handleClick, handleDragEnd }) {
    return (
        <Draggable onStop={handleDragEnd}>
            <label className="label cursor-pointer">
                <input
                    type="checkbox"
                    className="toggle"
                    checked={isOn}
                    onChange={handleClick}
                    onMouseDown={(e) => e.stopPropagation()}
                />
            </label>
        </Draggable>
    )
}

function Card({ Toggle, onChange, name, canvasRef, content }) {
    const [dragging, setDragging] = useState(false)
    const nodeRef = React.useRef(null)
    const [toggleWidth, setToggleWidth] = useState()
    const [x, setX] = useState(0)

    function isCloserToRightEdge(e) {
        return draggedToRightSide(x, toggleWidth, canvasRef.current.clientWidth)
    }

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
            }}
            onMouseDown={() => setToggleWidth(nodeRef.current.clientWidth)}
            onDrag={({ movementX }) => {
                setDragging(true)
                setX(x + movementX)
            }}
        >
            <div
                ref={nodeRef}
                className={`card w-96 bg-base-100 shadow-xl ${dragClassNames}`}
            >
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>
                        {content}
                        {/* The amazing feature you requested is:{" "} */}
                        {/* {isOn ? "on" : "off"} */}
                    </p>
                    <div className="card-actions justify-end">
                        <CardContext.Provider value={isCloserToRightEdge}>
                            <Toggle onChange={onChange} />
                        </CardContext.Provider>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

function UseEffectCard({ canvasRef }) {
    function handleChange() {}
    return (
        <Card
            Toggle={UseEffectToggle}
            name={"Toggle using useEffect"}
            onChange={handleChange}
            canvasRef={canvasRef}
        />
    )
}

function FunctionCard({ canvasRef }) {
    function handleChange() {}
    return (
        <Card
            Toggle={FunctionToggle}
            name={"Toggle using a function"}
            onChange={handleChange}
            canvasRef={canvasRef}
        />
    )
}

function ParentCard({ canvasRef }) {
    const [isOn, setIsOn] = useState(false)
    const content = `The amazing feature you requested is ${
        isOn ? "on" : "off"
    }`

    function handleChange() {
        setIsOn(!isOn)
    }
    return (
        <Card
            Toggle={ParentToggle}
            name={"Toggle in parent"}
            onChange={handleChange}
            canvasRef={canvasRef}
            content={content}
        />
    )
}

export default function App() {
    const canvasRef = createRef()

    return (
        <div ref={canvasRef} className="flex flex-col m-4 space-y-4">
            <UseEffectCard canvasRef={canvasRef} />
            <FunctionCard canvasRef={canvasRef} />
            <ParentCard canvasRef={canvasRef} />
        </div>
    )
}
