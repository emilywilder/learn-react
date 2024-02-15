import { createContext, useContext, useEffect, useState } from "react"

const ChatContext = createContext()

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
    const toggleShowChatroom = useContext(ChatContext)

    return (
        <div className="card shadow-xl w-full h-full">
            <div className="card-body">
                <div className="flex justify-between">
                    <div className="card-title order-first">
                        Chatroom #{roomId}
                    </div>
                    <button
                        className="btn btn-sm order-last"
                        onClick={() => toggleShowChatroom(roomId)}
                    >
                        Hide
                    </button>
                </div>

                <p>Welcome to Chat!</p>
                <input
                    className="input input-bordered"
                    placeholder="Type here..."
                ></input>
            </div>
        </div>
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
                <ChatContext.Provider value={toggleShowChatroom}>
                    {chatrooms.map((r) => (
                        <div key={r.id} className="w-72 h-72">
                            <div
                                className={`w-full h-full ${
                                    !r.visible &&
                                    " rounded-xl hover:ring-1 hover:ring-yellow-500"
                                }`}
                            >
                                {r.visible ? (
                                    <ChatRoom roomId={r.id} />
                                ) : (
                                    <div className="flex justify-center items-center h-full">
                                        <div className="flex gap-2">
                                            <button
                                                className="btn"
                                                onClick={() =>
                                                    toggleShowChatroom(r.id)
                                                }
                                            >
                                                {"Show"}
                                            </button>
                                            <button
                                                className="btn"
                                                onClick={() =>
                                                    removeChatroom(r.id)
                                                }
                                            >
                                                {"Delete"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </ChatContext.Provider>
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
