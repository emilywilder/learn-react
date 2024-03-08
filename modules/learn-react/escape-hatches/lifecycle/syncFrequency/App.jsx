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

function ChatCard({}) {
    const chatrooms = [
        { id: 0, name: "General" },
        { id: 1, name: "Abstract" },
    ]
    const users = [
        { id: 0, name: "Chatbot" },
        { id: 1, name: "Guest" },
    ]
    const [messages, setMessages] = useState([])
    const [getReply, setGetReply] = useState(false)
    const [selected, setSelected] = useState(0)

    function findRoomById(roomId) {
        return chatrooms.find((r) => r.id === Number(roomId))
    }

    const roomIds = chatrooms.map((room) => room.id)

    const maxMessageId = messages.reduce(
        (m, prev) => (m.id > prev.id ? m.id : prev.id),
        0
    )

    const room = findRoomById(selected)
    const msgIds = filterMessagesByRoomId(room.id).map((msg) => msg.id)

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

    function filterMessagesByRoomId(roomId) {
        return messages.filter((m) => m.roomId === room.id)
    }

    function messageInGroup(msgId) {
        const roomMessages = filterMessagesByRoomId(room.id)
        const message = roomMessages.find((m) => m.id === msgId) || {}
        const prev = roomMessages.find((m) => m.id === msgId - 1) || {}
        return message.userId === prev.userId
    }

    if (!(filterMessagesByRoomId(room.id).length > 0)) {
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
                            <div>Chatroom</div>
                        </div>
                    </div>
                    <div className="order-last">
                        <RoomMenu
                            roomIds={roomIds}
                            findRoomById={findRoomById}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </div>
                </div>

                <ChatRoomContext.Provider
                    value={[msgIds, addChatMessage, setGetReply]}
                >
                    <ChatMessageContext.Provider
                        value={[findMessageById, findUserById, messageInGroup]}
                    >
                        <p>Welcome to {room.name} Chat!</p>
                        <ChatRoom key={room.id} roomId={room.id} />
                    </ChatMessageContext.Provider>
                </ChatRoomContext.Provider>
            </div>
        </div>
    )
}

function RoomMenu({ roomIds, findRoomById, selected, setSelected }) {
    return (
        <details className="dropdown dropdown-right">
            <summary className="m-1 btn w-24">
                {findRoomById(selected).name}
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
                {roomIds.map((roomId) => (
                    <li key={roomId}>
                        <a onClick={() => setSelected(roomId)}>
                            <ConnectionIndicator roomId={roomId} />
                            <span>{findRoomById(roomId).name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </details>
    )
}

export default function SyncFrequency() {
    return (
        <div className="flex justify-center items-center m-10">
            <ChatCard />
        </div>
    )
}
