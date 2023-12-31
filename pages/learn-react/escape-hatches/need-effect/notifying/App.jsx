import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"

const WindowContext = createContext()

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
    const windowRef = useContext(WindowContext)

    function isCloserToRightEdge(e) {
        const dropPosition = e.clientX
        const windowWidth = windowRef.current.clientWidth
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
    return (
        <div
            draggable
            onDragEnd={handleDragEnd}
            className="card w-96 bg-base-100 shadow-xl"
        >
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>
                    The amazing feature you requested is: {isOn ? "on" : "off"}
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
    )
}

export default function App() {
    const [parentIsOn, setParentIsOn] = useState(false)
    const windowRef = useRef()

    function handleChange() {}

    function handleParentChange() {
        setParentIsOn(!parentIsOn)
        handleChange()
    }

    return (
        <WindowContext.Provider value={windowRef}>
            <div ref={windowRef} className="flex flex-col m-4 space-y-4">
                <UseEffectToggle onChange={handleChange} />
                <FunctionToggle onChange={handleChange} />
                <ParentToggle onChange={handleParentChange} isOn={parentIsOn} />
            </div>
        </WindowContext.Provider>
    )
}
