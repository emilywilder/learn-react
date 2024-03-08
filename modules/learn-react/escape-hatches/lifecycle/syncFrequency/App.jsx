import {
    createContext,
    createRef,
    useContext,
    useEffect,
    useState,
} from "react"
import { createConnection, serverUrl, useConnectionStore } from "./net"
import { ChatBubble } from "react-daisyui"

const ChatMessageContext = createContext()
const ChatRoomContext = createContext()

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
    const [msgIds, addChatMessage, setGetReply] = useContext(ChatRoomContext)
    const scrollRef = createRef(null)

    useEffect(() => {
        scrollRef.current.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
        })
    }, [scrollRef, msgIds])

    function handleClick(e) {
        e.preventDefault()
        addChatMessage(1, text)
        setText("")
        setGetReply(true)
    }

    return (
        <>
            <p>Welcome to Chat!</p>
            <div className="max-h-40 overflow-auto">
                {msgIds.map((msgId) => (
                    <ChatMessage key={msgId} msgId={msgId} />
                ))}
                <div ref={scrollRef} />
            </div>
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
        </>
    )
    // not in example end
}

// Example end

function ChatMessage({ msgId }) {
    const [findMessageById, findUserById, messageInGroup] =
        useContext(ChatMessageContext)

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

function ChatCard({ roomId, findRoomById }) {
    const [getReply, setGetReply] = useState(false)
    const room = findRoomById(roomId)
    const [messages, setMessages] = useState([])
    const users = [
        { id: 0, name: "Chatbot" },
        { id: 1, name: "Guest" },
    ]
    const msgIds = messages.map((msg) => msg.id)

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
        const message = messages.find((m) => m.id === msgId)
        const prev = messages.find((m) => m.id === msgId - 1) || {}
        return message.userId === prev.userId
    }

    if (!(messages.length > 0)) {
        addChatMessage(0, "Hello!")
    }

    if (getReply) {
        getApiReply()
        setGetReply(false)
    }

    return (
        <div className="card shadow-xl hover:ring-2 h-[26em] w-[20em]">
            <div className="card-body">
                <div className="flex justify-between items-center relative">
                    <div className="card-title order-first">
                        <div className="flex items-center gap-2">
                            <ConnectionIndicator roomId={room.id} />
                            <div>Chatroom {room.id}</div>
                        </div>
                    </div>
                    <button className="btn btn-sm order-last w-16">
                        {room.visible ? "Hide" : "Show"}
                    </button>
                </div>

                <ChatRoomContext.Provider
                    value={[msgIds, addChatMessage, setGetReply]}
                >
                    <ChatMessageContext.Provider
                        value={[findMessageById, findUserById, messageInGroup]}
                    >
                        <ChatRoom roomId={room.id} />
                    </ChatMessageContext.Provider>
                </ChatRoomContext.Provider>
            </div>
        </div>
    )
}

export default function EffectLifecycle() {
    const [chatrooms, setChatrooms] = useState([{ id: 1, visible: true }])

    function findRoomById(roomId) {
        return chatrooms.find((r) => r.id === roomId)
    }

    const r = findRoomById(1)

    return (
        <div className="m-4">
            <div className="flex flex-wrap gap-4">
                <ChatCard
                    key={r.id}
                    roomId={r.id}
                    findRoomById={findRoomById}
                />
            </div>
        </div>
    )
}
