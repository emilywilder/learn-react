import { useEffect, useState } from "react"
import ChatBox from "./Chat"

function useOnlineStatus() {
    // Not ideal: Manual store subscription in an Effect
    const [isOnline, setIsOnline] = useState(true)
    useEffect(() => {
        function updateState() {
            setIsOnline(navigator.onLine)
        }

        updateState()

        window.addEventListener("online", updateState)
        window.addEventListener("offline", updateState)
        return () => {
            window.removeEventListener("online", updateState)
            window.removeEventListener("offline", updateState)
        }
    }, [])
    return isOnline
}

function ChatIndicator() {
    const isOnline = useOnlineStatus()
    // ...
    return <ChatBox title={"UseEffect Chat!"} isOnline={isOnline} />
}

export default ChatIndicator
