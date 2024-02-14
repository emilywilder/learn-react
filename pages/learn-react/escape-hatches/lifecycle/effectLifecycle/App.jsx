import { useEffect, useState } from "react"

function createConnection(serverUrl, roomId) {
    const identifier = `${serverUrl}:${roomId}`

    const connect = () => console.log(`connect to ${identifier}`)
    const disconnect = () => console.log(`disconnect from ${identifier}`)

    return { connect: connect, disconnect: disconnect }
}

// Example start

const serverUrl = "https://localhost:1234"

function ChatRoom({ roomId }) {
    useEffect(() => {
        const connection = createConnection(serverUrl, roomId)
        connection.connect()
        return () => {
            connection.disconnect()
        }
    }, [roomId])
    // ...
    return (
        <div className="card shadow-xl m-4">
            <div className="card-body">
                <div className="card-title">Chatroom #{roomId}</div>
                <p>Welcome to Chat!</p>
                <input
                    className="input input-bordered"
                    placeholder="Type here..."
                ></input>
            </div>
        </div>
    )
}

// Example end

export default function EffectLifecycle() {
    const [chatrooms, setChatrooms] = useState([])
    const maxRoomId = chatrooms.reduce(
        (r, prev) => (r.id > prev.id ? r.id : prev.id),
        0
    )

    function addChatroom() {
        const nextRoom = { id: maxRoomId + 1 }
        setChatrooms([...chatrooms, nextRoom])
    }

    return (
        <div className="m-4">
            <div className="flex flex-wrap">
                {chatrooms.map((r) => (
                    <ChatRoom key={r.id} roomId={r.id} />
                ))}
            </div>
            <div className="fixed bottom-10 right-10">
                <div>
                    <button className="btn" onClick={addChatroom}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}
