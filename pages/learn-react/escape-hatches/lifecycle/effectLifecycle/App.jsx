import { useEffect } from "react"

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
}

// Example end

export default function EffectLifecycle() {
    return <ChatRoom roomId={0} />
}
