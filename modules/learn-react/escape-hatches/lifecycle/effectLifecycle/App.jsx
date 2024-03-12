import {
    createContext,
    createRef,
    useContext,
    useEffect,
    useState,
} from "react"
import { createConnection, serverUrl, useConnectionStore } from "./net"
import { ChatBubble } from "react-daisyui"
import { useSpring, animated } from "@react-spring/web"

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

function ChatCard({
    roomId,
    findRoomById,
    toggleShowChatroom,
    removeChatroom,
}) {
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
        <div className="card shadow-xl bg-base-100 hover:ring-2 h-[26em] w-[20em]">
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
                    <ChatRoomContext.Provider
                        value={[msgIds, addChatMessage, setGetReply]}
                    >
                        <ChatMessageContext.Provider
                            value={[
                                findMessageById,
                                findUserById,
                                messageInGroup,
                            ]}
                        >
                            <ChatRoom roomId={room.id} />
                        </ChatMessageContext.Provider>
                    </ChatRoomContext.Provider>
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
        const nextRoomId = maxRoomId + 1
        const nextRoom = { id: nextRoomId, visible: true }
        setChatrooms([...chatrooms, nextRoom])
    }

    return (
        <div className="m-4">
            <div className="flex flex-wrap gap-4">
                {chatrooms.length > 0 ? (
                    chatrooms.map((r) => (
                        <ChatCard
                            key={r.id}
                            roomId={r.id}
                            findRoomById={findRoomById}
                            removeChatroom={removeChatroom}
                            toggleShowChatroom={toggleShowChatroom}
                        />
                    ))
                ) : (
                    <div>
                        <div className="flex items-center justify-center h-[60vh] w-screen">
                            <p className="text-xl">Add a chatroom!</p>
                        </div>
                        <div className="fixed bottom-20 right-2 w-32 h-32">
                            <Arrow />
                        </div>
                    </div>
                )}
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

function Arrow() {
    const springs = useSpring({
        from: { y: 0 },
        to: { y: -10 },
        config: { mass: 10, friction: 5, tension: 100 },
    })

    return (
        <animated.div style={{ ...springs, opacity: 0.75 }}>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5303 13.9697C17.8232 14.2626 17.8232 14.7374 17.5303 15.0303L12.5303 20.0303C12.2374 20.3232 11.7626 20.3232 11.4697 20.0303L6.46967 15.0303C6.17678 14.7374 6.17678 14.2626 6.46967 13.9697C6.76256 13.6768 7.23744 13.6768 7.53033 13.9697L11.25 17.6893L11.25 9.5C11.25 8.78668 11.0298 7.70001 10.3913 6.81323C9.7804 5.96468 8.75556 5.25 7 5.25C6.58579 5.25 6.25 4.91421 6.25 4.5C6.25 4.08579 6.58579 3.75 7 3.75C9.24444 3.75 10.7196 4.70198 11.6087 5.93677C12.4702 7.13332 12.75 8.54665 12.75 9.5L12.75 17.6893L16.4697 13.9697C16.7626 13.6768 17.2374 13.6768 17.5303 13.9697Z"
                        fill="#1C274C"
                    ></path>{" "}
                </g>
            </svg>
        </animated.div>
    )
}
