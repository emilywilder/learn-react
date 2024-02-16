import { createContext, useContext, useEffect, useState } from "react"

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

    // not in example start

    return (
        <>
            <p>Welcome to Chat!</p>
            <input
                className="input input-bordered"
                placeholder="Type here..."
            ></input>
        </>
    )
    // not in example end
}

// Example end

export default function EffectLifecycle() {
    const [chatrooms, setChatrooms] = useState([{ id: 1, visible: true }])

    const maxRoomId = chatrooms.reduce(
        (r, prev) => (r.id > prev.id ? r.id : prev.id),
        0
    )

    function addChatroom() {
        const nextRoom = { id: maxRoomId + 1, visible: true }
        setChatrooms([...chatrooms, nextRoom])
    }

    function toggleShowChatroom(roomId) {
        const nextChatrooms = chatrooms.map((r) => {
            if (r.id === roomId) {
                return { ...r, visible: !r.visible }
            } else {
                return r
            }
        })
        setChatrooms(nextChatrooms)
    }

    function removeChatroom(roomId) {
        setChatrooms(chatrooms.filter((r) => r.id !== roomId))
    }

    return (
        <div className="m-4">
            <div className="flex flex-wrap gap-4">
                {chatrooms.map((r) => (
                    <div key={r.id} className="w-72 h-72">
                        <div
                            className={`w-full h-full ${
                                !r.visible &&
                                " rounded-xl hover:ring-1 hover:ring-yellow-500"
                            }`}
                        >
                            <div className="card shadow-xl w-full h-full">
                                <div className="card-body">
                                    <div className="flex justify-between">
                                        <div className="card-title order-first">
                                            Chatroom #{r.id}
                                        </div>
                                        <button
                                            className="btn btn-sm order-last w-16"
                                            onClick={() =>
                                                toggleShowChatroom(r.id)
                                            }
                                        >
                                            {r.visible ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    {r.visible ? (
                                        <ChatRoom roomId={r.id} />
                                    ) : (
                                        <div className="relative flex justify-center items-center h-full">
                                            <button
                                                className="btn btn-error text-white"
                                                onClick={() =>
                                                    removeChatroom(r.id)
                                                }
                                            >
                                                {"Delete"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="fixed bottom-10 right-10">
                <div>
                    <button className="btn btn-primary" onClick={addChatroom}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}
