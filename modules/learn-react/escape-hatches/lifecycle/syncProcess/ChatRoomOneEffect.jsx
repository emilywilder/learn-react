import { useEffect, useContext } from "react"
import { createConnection, serverUrl } from "./net"
import { ChatRoomRender, ChatContext } from "./Chat"

export default function ChatRoom({ roomId }) {
    useEffect(() => {
        logVisit(roomId)
        const connection = createConnection(serverUrl, roomId)
        connection.connect()
        return () => {
            connection.disconnect()
        }
    }, [roomId])
    // ...

    const logVisit = useContext(ChatContext)
    return <ChatRoomRender roomId={roomId} />
}
