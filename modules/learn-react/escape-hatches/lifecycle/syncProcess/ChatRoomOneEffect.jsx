import { useEffect } from "react"
import { createConnection, serverUrl } from "./net"
import { ChatRoomRender, logVisit } from "./Chat"

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
    return <ChatRoomRender roomId={roomId} />
}
