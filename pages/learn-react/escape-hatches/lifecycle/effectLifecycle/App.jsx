import { createRef, useEffect, useState } from "react"
import { createConnection, serverUrl, useConnectionStore } from "./net"
import { ChatBubble } from "react-daisyui"

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
    const [messages, setMessages] = useState([])
    const users = [
        { id: 0, name: "Chatbot" },
        { id: 1, name: "Guest" },
    ]

    const scrollRef = createRef(null)

    const maxMessageId = messages.reduce(
        (m, prev) => (m.id > prev.id ? m.id : prev.id),
        0
    )

    function addChatMessage(userId, message) {
        setMessages([
            ...messages,
            {
                id: maxMessageId + 1,
                userId: userId,
                message: message,
            },
        ])
    }

    function findUserById(userId) {
        return users.find((x) => x.id === userId)
    }

    useEffect(() => {
        scrollRef.current.scrollIntoView({
            behavior: "smooth",
        })
    }, [scrollRef, messages])

    function handleClick(text) {
        if (text) {
            addChatMessage(1, text)
            setText("")
        }
    }

    function handleKeyDown(e) {
        e.keyCode === 13 && handleClick(text)
    }

    if (!(messages.length > 0)) {
        addChatMessage(0, "Hello!")
    }

    return (
        <>
            <p>Welcome to Chat!</p>
            <div className="max-h-40 overflow-auto">
                {messages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        message={msg}
                        findUserById={findUserById}
                    />
                ))}
                <div ref={scrollRef} />
            </div>
            <input
                className="input input-bordered"
                placeholder="Type here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className="flex justify-end">
                <button
                    className="btn"
                    onClick={() => {
                        handleClick(text)
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
            <div className="card shadow-xl">
                <div className="card-body">
                    <div className="flex justify-between items-center relative">
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
    )
}

export default function EffectLifecycle() {
    const [chatrooms, setChatrooms] = useState([])

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
        const nextRoomId = maxRoomId + 1
        const nextRoom = { id: nextRoomId, visible: true }
        setChatrooms([...chatrooms, nextRoom])
    }

    if (!(chatrooms.length > 0)) {
        addChatroom()
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
