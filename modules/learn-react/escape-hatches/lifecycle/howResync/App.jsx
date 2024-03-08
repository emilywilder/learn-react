import { useState } from "react"
import { RoomMenu, ChatRoom } from "./ChatRoom"

export default function HowResync() {
    const [selected, setSelected] = useState(0)
    return (
        <>
            <div className="fixed top-24 right-14">
                <RoomMenu setSelected={setSelected} />
            </div>
            <div className="flex justify-center items-center m-10">
                <ChatRoom roomId={selected} />
            </div>
        </>
    )
}
