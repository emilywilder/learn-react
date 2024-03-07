import { useSyncExternalStore } from "react"

export const serverUrl: string = "https://localhost:1234"

// Method for using useSyncExternalStore with globals from
// https://javascript.plainenglish.io/usesyncexternalstore-to-manage-global-state-in-react-ac31c7191376

let CHAT_CONNECTIONS: Array<number> = []
const CHAT_CALLBACKS: Array<Function> = []

function addConnection(roomId: number): void {
    CHAT_CONNECTIONS = [...CHAT_CONNECTIONS, roomId]
    notify()
}

function removeConnection(roomId: number): void {
    CHAT_CONNECTIONS = CHAT_CONNECTIONS.filter((id) => id !== roomId)
    notify()
}

function notify(): void {
    CHAT_CALLBACKS.forEach((cb) => cb())
}

export function subscribe(cb: () => void): () => void {
    CHAT_CALLBACKS.push(cb)
    return () => {
        const index: number = CHAT_CALLBACKS.indexOf(cb)
        if (index > -1) {
            CHAT_CALLBACKS.splice(index, 1)
        }
    }
}

export function useConnectionStore(roomId: number): boolean {
    function getSnapshot(): boolean {
        return CHAT_CONNECTIONS.includes(roomId)
    }

    return useSyncExternalStore(
        subscribe,
        getSnapshot, // client
        () => true // server
    )
}

interface ConnectionType {
    connect: Function
    disconnect: Function
}

export function createConnection(
    serverUrl: string,
    roomId: number
): ConnectionType {
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
