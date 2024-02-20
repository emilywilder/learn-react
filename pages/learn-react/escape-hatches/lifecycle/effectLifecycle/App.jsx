import { createContext, useContext, useEffect, useState } from "react"
import { createConnection, serverUrl, useConnectionStore } from "./net"
import { ChatBubble } from "react-daisyui"

const MessagesContext = createContext(null)

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

    const [text, setText] = useState("")
    const [addChatMessage, findMessagesByRoomId, findUserById] =
        useContext(MessagesContext)

    function sendMessage(text) {
        addChatMessage(roomId, 1, text)
        setText("")
    }
    const messages = findMessagesByRoomId(roomId)

    return (
        <>
            <p>Welcome to Chat!</p>
            {messages.map((msg) => (
                <ChatMessage
                    key={msg.id}
                    message={msg}
                    findUserById={findUserById}
                />
            ))}
            <input
                className="input input-bordered"
                placeholder="Type here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="flex justify-end">
                <button
                    className="btn"
                    onClick={() => {
                        text && sendMessage(text)
                    }}
                >
                    Send
                </button>
            </div>
        </>
    )
    // not in example end
}

// Example end

function ChatMessage({ message, findUserById }) {
    const user = findUserById(message.userId)
    return (
        <ChatBubble end={user.id === 0 ? false : true}>
            <ChatBubble.Header>{user.name}</ChatBubble.Header>
            <ChatBubble.Message>{message.message}</ChatBubble.Message>
        </ChatBubble>
    )
}

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
        <div className="w-72">
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
    const [messages, setMessages] = useState([
        {
            id: 0,
            roomId: 1,
            userId: 0,
            message: "Hello!",
        },
    ])
    const users = [
        { id: 0, name: "Chatbot" },
        { id: 1, name: "Guest" },
    ]

    const maxRoomId = chatrooms.reduce(
        (r, prev) => (r.id > prev.id ? r.id : prev.id),
        0
    )

    const maxMessageId = messages.reduce(
        (m, prev) => (m.id > prev.id ? m.id : prev.id),
        0
    )

    function findMessagesByRoomId(roomId) {
        return messages.filter((r) => r.roomId === roomId)
    }

    function findUserById(userId) {
        return users.find((x) => x.id === userId)
    }

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
        const nextRoomId = maxRoomId + 1
        const nextRoom = { id: nextRoomId, visible: true }
        addChatMessage(nextRoomId, 0, "Hello!")
        setChatrooms([...chatrooms, nextRoom])
    }

    function addChatMessage(roomId, userId, message) {
        setMessages([
            ...messages,
            {
                id: maxMessageId + 1,
                roomId: roomId,
                userId: userId,
                message: message,
            },
        ])
    }

    return (
        <div className="m-4">
            <div className="flex flex-wrap gap-4">
                <MessagesContext.Provider
                    value={[addChatMessage, findMessagesByRoomId, findUserById]}
                >
                    {chatrooms.map((r) => (
                        <ChatCard
                            key={r.id}
                            roomId={r.id}
                            findRoomById={findRoomById}
                            removeChatroom={removeChatroom}
                            toggleShowChatroom={toggleShowChatroom}
                        />
                    ))}
                </MessagesContext.Provider>
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
