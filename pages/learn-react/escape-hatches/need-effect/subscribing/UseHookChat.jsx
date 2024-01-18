import { useSyncExternalStore } from "react"

function subscribe(callback) {
    window.addEventListener("online", callback)
    window.addEventListener("offline", callback)
    return () => {
        window.removeEventListener("online", callback)
        window.removeEventListener("offline", callback)
    }
}

function useOnlineStatus() {
    // ✅ Good: Subscribing to an external store with a built-in Hook
    return useSyncExternalStore(
        subscribe, // React won't resubscribe for as long as you pass the same function
        () => navigator.onLine, // How to get the value on the client
        () => true // How to get the value on the server
    )
}

function ChatIndicator() {
    const isOnline = useOnlineStatus()
    // ...
}

export default ChatIndicator
