import { useState, useEffect } from "react"
import { experimental_useEffectEvent as useEffectEvent } from "react"
import { createConnection, sendMessage } from "./chat.js"
import { showNotification } from "./notifications.js"

const serverUrl = "https://localhost:1234"

function ChatRoom({ roomId, theme }) {
    const onConnected = useEffectEvent((roomId) => {
        showNotification("Welcome to " + roomId, theme)
    })

    useEffect(() => {
        const connection = createConnection(serverUrl, roomId)
        let timeoutId
        connection.on("connected", () => {
            timeoutId = setTimeout(() => {
                onConnected(roomId)
            }, 2000)
        })
        connection.connect()
        return () => {
            connection.disconnect()
            if (timeoutId !== undefined) clearTimeout(timeoutId)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId])

    return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
    const [roomId, setRoomId] = useState("general")
    const [isDark, setIsDark] = useState(false)
    return (
        <>
            <label>
                Choose the chat room:{" "}
                <select
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                >
                    <option value="general">general</option>
                    <option value="travel">travel</option>
                    <option value="music">music</option>
                </select>
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={isDark}
                    onChange={(e) => setIsDark(e.target.checked)}
                />
                Use dark theme
            </label>
            <hr />
            <ChatRoom roomId={roomId} theme={isDark ? "dark" : "light"} />
        </>
    )
}
