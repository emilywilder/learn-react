import { createRef, useEffect, useState } from "react"
import { createConnection, serverUrl, useConnectionStore } from "./net"
import { ChatBubble } from "react-daisyui"

const chatrooms = [
    { id: 0, name: "General" },
    { id: 1, name: "Travel" },
]

function findRoomById(roomId) {
    return chatrooms.find((r) => r.id === Number(roomId))
}

// Example start

function ChatRoom({ roomId }) {
    // not in example start
    const users = [
        { id: 0, name: "Chatbot" },
        { id: 1, name: "Guest" },
    ]
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

    function findUserById(userId) {
        return users.find((x) => x.id === userId)
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
    // not in example end

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
            <div className="card shadow-xl hover:ring-2 h-[26em] w-[20em]">
                <div className="card-body">
                    <div className="card-title">Chatroom</div>
                    <p>Welcome to {room.name} Chat!</p>

                    <MessageHistory
                        msgIds={msgIds}
                        findMessageById={findMessageById}
                        findUserById={findUserById}
                        messageInGroup={messageInGroup}
                    />

                    <ChatForm handleSubmit={handleSubmit} />
                </div>
            </div>
        </>
    )
    // not in example end
}

// Example end

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

function MessageHistory({
    msgIds,
    findMessageById,
    findUserById,
    messageInGroup,
}) {
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
                    findUserById={findUserById}
                    messageInGroup={messageInGroup}
                />
            ))}
            <div ref={scrollRef} />
        </div>
    )
}

function ChatMessage({ msgId, findMessageById, findUserById, messageInGroup }) {
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

function RoomMenu({ setSelected }) {
    return (
        <details className="dropdown dropdown-bottom dropdown-end">
            <summary className="m-1 btn w-24">Rooms</summary>
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

export default function SyncFrequency() {
    const [selected, setSelected] = useState(0)
    return (
        <>
            <div className="fixed top-24 right-14">
                <RoomMenu setSelected={setSelected} />
            </div>
            <div className="flex justify-center items-center m-10">
                <ChatRoom roomId={selected} />
            </div>
        </>
    )
}
