export const serverUrl = "https://localhost:1234"

export function createConnection(serverUrl, roomId) {
    const identifier = `${serverUrl}:${roomId}`

    const connect = () => console.log(`connect to ${identifier}`)
    const disconnect = () => console.log(`disconnect from ${identifier}`)

    return { connect: connect, disconnect: disconnect }
}
