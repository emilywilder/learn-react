import { useSyncExternalStore } from "react"

export const serverUrl = "https://localhost:1234"

// Method for using useSyncExternalStore with globals from
// https://javascript.plainenglish.io/usesyncexternalstore-to-manage-global-state-in-react-ac31c7191376

let CHAT_CONNECTIONS = []
const CHAT_CALLBACKS = []

function addConnection(roomId) {
    CHAT_CONNECTIONS = [...CHAT_CONNECTIONS, roomId]
    notify()
}

function removeConnection(roomId) {
    CHAT_CONNECTIONS = CHAT_CONNECTIONS.filter((id) => id !== roomId)
    notify()
}

function notify() {
    CHAT_CALLBACKS.forEach((cb) => cb())
}

export function subscribe(cb) {
    CHAT_CALLBACKS.push(cb)
}

export function useOnlineStatus(roomId) {
    return useSyncExternalStore(
        subscribe,
        () => CHAT_CONNECTIONS.find((x) => x === roomId), // client
        () => true // server
    )
}

export function createConnection(serverUrl, roomId) {
    const identifier = `${serverUrl}:${roomId}`

    const connect = () => {
        addConnection(roomId)
        console.log(`connected to ${identifier}`)
    }

    const disconnect = () => {
        removeConnection(roomId)
        console.log(`disconnected from ${identifier}`)
    }

    return { connect: connect, disconnect: disconnect }
}
