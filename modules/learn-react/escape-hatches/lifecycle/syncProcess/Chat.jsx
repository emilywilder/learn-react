import { createRef, useEffect, useState } from "react"
import { useConnectionStore } from "./net"
import { ChatBubble } from "react-daisyui"
import { createContext } from "react"

export const ChatContext = createContext()

export const chatrooms = [
    { id: 0, name: "General" },
    { id: 1, name: "Travel" },
    { id: 2, name: "Music" },
]

const users = [
    { id: 0, name: "Chatbot" },
    { id: 1, name: "Guest" },
]

export function findRoomById(roomId) {
    return chatrooms.find((r) => r.id === Number(roomId))
}

function findUserById(userId) {
    return users.find((x) => x.id === userId)
}

export function ChatRoomRender({ roomId }) {
    const [messages, setMessages] = useState([])
    const [getReply, setGetReply] = useState(false)

    const maxMessageId = messages.reduce(
        (m, prev) => (m.id > prev.id ? m.id : prev.id),
        0
    )

    const room = findRoomById(roomId)
    const roomMessages = messages.filter((m) => m.roomId === room.id)
    const msgIds = roomMessages.map((msg) => msg.id)

    function addChatMessage(userId, message) {
        setMessages([
            ...messages,
            {
                id: maxMessageId + 1,
                userId: userId,
                roomId: room.id,
                message: message,
            },
        ])
    }

    function getApiReply() {
        setTimeout(async () => {
            const res = await fetch("/api/magicEightBallChatbot")
            const json = await res.json()

            addChatMessage(0, json.text)
        }, 1000)
    }

    function findMessageById(msgId) {
        return messages.find((x) => x.id === msgId)
    }

    function messageInGroup(msgId) {
        const message = roomMessages.find((m) => m.id === msgId) || {}
        const prev = roomMessages.find((m) => m.id === msgId - 1) || {}
        return message.userId === prev.userId
    }

    if (!(roomMessages.length > 0)) {
        addChatMessage(0, "Hello!")
    }

    if (getReply) {
        getApiReply()
        setGetReply(false)
    }

    function handleSubmit(text) {
        addChatMessage(1, text)
        setGetReply(true)
    }

    return (
        <>
            <div className="card bg-base-100 shadow-xl h-[26em] w-[20em] ">
                <div className="card-body">
                    <div className="card-title">Chatroom</div>
                    <p>Welcome to {room.name} Chat!</p>

                    <MessageHistory
                        msgIds={msgIds}
                        findMessageById={findMessageById}
                        messageInGroup={messageInGroup}
                    />

                    <ChatForm handleSubmit={handleSubmit} />
                </div>
            </div>
        </>
    )
}

function ChatForm({ handleSubmit }) {
    const [text, setText] = useState("")

    function handleClick(e) {
        e.preventDefault()
        setText("")
        handleSubmit(text)
    }
    return (
        <form className="space-y-4" onSubmit={(e) => handleClick(e)}>
            <input
                className="input input-bordered"
                placeholder="Type here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
            <div className="flex justify-end">
                <button type="submit" className="btn">
                    Send
                </button>
            </div>
        </form>
    )
}

function MessageHistory({ msgIds, findMessageById, messageInGroup }) {
    const scrollRef = createRef(null)

    useEffect(() => {
        scrollRef.current.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
        })
    }, [scrollRef, msgIds])

    return (
        <div className="max-h-40 overflow-auto">
            {msgIds.map((msgId) => (
                <ChatMessage
                    key={msgId}
                    msgId={msgId}
                    findMessageById={findMessageById}
                    messageInGroup={messageInGroup}
                />
            ))}
            <div ref={scrollRef} />
        </div>
    )
}

function ChatMessage({ msgId, findMessageById, messageInGroup }) {
    const message = findMessageById(msgId)
    const user = findUserById(message.userId)
    const isInGroup = messageInGroup(message.id)
    return (
        <ChatBubble end={user.id === 0 ? false : true}>
            {!isInGroup && <ChatBubble.Header>{user.name}</ChatBubble.Header>}
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

export function RoomMenu({ setSelected }) {
    return (
        <details className="dropdown dropdown-bottom">
            <summary className="btn w-24">Rooms</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
                {chatrooms.map((room) => (
                    <li key={room.id}>
                        <a onClick={() => setSelected(room.id)}>
                            <ConnectionIndicator roomId={room.id} />
                            <span>{room.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </details>
    )
}

export function logVisit(roomId) {
    console.log(`In room ${roomId}`)
}
