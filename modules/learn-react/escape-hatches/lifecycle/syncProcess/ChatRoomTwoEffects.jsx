import { useEffect, useContext } from "react"
import { createConnection, serverUrl } from "./net"
import { ChatRoomRender, ChatContext } from "./Chat"

export default function ChatRoom({ roomId }) {
    useEffect(() => {
        logVisit(roomId)
    }, [roomId]) // eslint-disable-line

    useEffect(() => {
        const connection = createConnection(serverUrl, roomId)
        connection.connect()
        return () => {
            connection.disconnect()
        }
    }, [roomId])
    // ...

    const [title, logVisit] = useContext(ChatContext)
    return <ChatRoomRender roomId={roomId} title={title} />
}
