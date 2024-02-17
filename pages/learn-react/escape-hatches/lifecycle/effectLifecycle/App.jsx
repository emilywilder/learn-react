import { useEffect, useState } from "react"
import { createConnection, serverUrl, useConnectionStore } from "./net"

// Example start

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

function ConnectionIndicator({ roomId }) {
    const isConnected = useConnectionStore(roomId)
    const tooltipText = isConnected ? "Connected" : "Disconnected"
    const badgeColor = isConnected ? "badge-success" : "badge-error"

    return (
        <div className="tooltip" data-tip={tooltipText}>
            <div className={`badge badge-sm ${badgeColor}`} />
        </div>
    )
}

function ChatCard({
    roomId,
    findRoomById,
    toggleShowChatroom,
    removeChatroom,
}) {
    const room = findRoomById(roomId)

    return (
        <div className="w-72 h-72">
            <div className="w-full h-full">
                <div className="card shadow-xl w-full h-full">
                    <div className="card-body relative">
                        <div className="flex justify-between items-center">
                            <div className="card-title order-first">
                                <div className="flex items-center gap-2">
                                    <ConnectionIndicator roomId={room.id} />
                                    <div>Chatroom {room.id}</div>
                                </div>
                            </div>
                            <button
                                className="btn btn-sm order-last w-16"
                                onClick={() => toggleShowChatroom(room.id)}
                            >
                                {room.visible ? "Hide" : "Show"}
                            </button>
                        </div>
                        {room.visible ? (
                            <ChatRoom roomId={room.id} />
                        ) : (
                            <div className="relative flex justify-center items-center h-full">
                                <button
                                    className="btn btn-error text-white"
                                    onClick={() => removeChatroom(room.id)}
                                >
                                    {"Delete"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function EffectLifecycle() {
    const [chatrooms, setChatrooms] = useState([{ id: 1, visible: true }])

    const maxRoomId = chatrooms.reduce(
        (r, prev) => (r.id > prev.id ? r.id : prev.id),
        0
    )

    function findRoomById(roomId) {
        return chatrooms.find((r) => r.id === roomId)
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

    function addChatroom() {
        const nextRoom = { id: maxRoomId + 1, visible: true }
        setChatrooms([...chatrooms, nextRoom])
    }

    return (
        <div className="m-4">
            <div className="flex flex-wrap gap-4">
                {chatrooms.map((r) => (
                    <ChatCard
                        key={r.id}
                        roomId={r.id}
                        findRoomById={findRoomById}
                        removeChatroom={removeChatroom}
                        toggleShowChatroom={toggleShowChatroom}
                    />
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
