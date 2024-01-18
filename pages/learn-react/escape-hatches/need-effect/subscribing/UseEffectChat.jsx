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
}

export default ChatIndicator
