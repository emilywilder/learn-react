import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"
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
    const [isCloserToRightEdge, onDragEndRef] = useContext(CardContext)
    onDragEndRef.current = handleDragEnd

    return <RenderToggle isOn={isOn} handleClick={handleClick} />
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
    const [isCloserToRightEdge, onDragEndRef] = useContext(CardContext)
    onDragEndRef.current = handleDragEnd

    return <RenderToggle isOn={isOn} handleClick={handleClick} />
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
    const [isCloserToRightEdge, onDragEndRef] = useContext(CardContext)
    onDragEndRef.current = handleDragEnd

    return <RenderToggle isOn={isOn} handleClick={handleClick} />
}

function RenderToggle({ isOn, handleClick }) {
    return (
        <div className="form-control">
            <label className="label cursor-pointer space-x-1">
                <span className="label-text">Show</span>
                <input
                    type="checkbox"
                    className="toggle"
                    checked={isOn}
                    onChange={handleClick}
                    onMouseDown={(e) => e.stopPropagation()}
                />
            </label>
        </div>
    )
}

function Card({ Toggle, onChange, name, canvasRef, isOn, children }) {
    const [dragging, setDragging] = useState(false)
    const nodeRef = React.useRef(null)
    const [toggleWidth, setToggleWidth] = useState()
    const [x, setX] = useState(0)
    const onDragEndRef = useRef((e) => {
        console.error("No onDragEnd defined")
    })

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
                if (dragging) onDragEndRef.current(e)
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
                    {children}
                    <div className="card-actions justify-end">
                        <CardContext.Provider
                            value={[isCloserToRightEdge, onDragEndRef]}
                        >
                            <Toggle onChange={onChange} isOn={isOn} />
                        </CardContext.Provider>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

function SecretMessage({ message, show }) {
    return (
        <div className="flex space-x-1">
            <div>The secret message is</div>
            <div className="font-mono">
                {show
                    ? message
                    : message
                          .split("")
                          .map((l) => "█")
                          .join("")}
            </div>
        </div>
    )
}

function UseEffectCard({ canvasRef }) {
    const [showMessage, setShowMessage] = useState(false)
    const secretMessage = UseEffectCard.name

    function handleChange(bool) {
        setShowMessage(bool)
    }

    return (
        <Card
            Toggle={UseEffectToggle}
            name={"Toggle using useEffect"}
            onChange={handleChange}
            canvasRef={canvasRef}
        >
            <SecretMessage message={secretMessage} show={showMessage} />
        </Card>
    )
}

function FunctionCard({ canvasRef }) {
    const [showMessage, setShowMessage] = useState(false)
    const secretMessage = FunctionCard.name

    function handleChange(bool) {
        setShowMessage(bool)
    }

    return (
        <Card
            Toggle={FunctionToggle}
            name={"Toggle using a function"}
            onChange={handleChange}
            canvasRef={canvasRef}
        >
            <SecretMessage message={secretMessage} show={showMessage} />
        </Card>
    )
}

function ParentCard({ canvasRef }) {
    const [isOn, setIsOn] = useState(false)
    const secretMessage = ParentCard.name

    function handleChange(nextIsOn) {
        setIsOn(nextIsOn)
    }

    return (
        <Card
            Toggle={ParentToggle}
            name={"Toggle in parent"}
            onChange={handleChange}
            canvasRef={canvasRef}
            isOn={isOn}
        >
            <SecretMessage message={secretMessage} show={isOn} />
        </Card>
    )
}

export default function App() {
    const canvasRef = createRef()

    return (
        <div
            ref={canvasRef}
            className="flex flex-col p-4 space-y-4 bg-base-200 w-full h-screen"
        >
            <UseEffectCard canvasRef={canvasRef} />
            <FunctionCard canvasRef={canvasRef} />
            <ParentCard canvasRef={canvasRef} />
        </div>
    )
}
