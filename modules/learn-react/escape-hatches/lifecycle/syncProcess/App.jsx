import { useState } from "react"
import ChatRoomOneEffect from "./ChatRoomOneEffect"
import { RoomMenu } from "./Chat"

export default function SyncProcess() {
    const [selected, setSelected] = useState(0)
    const [show, setShow] = useState(true)

    return (
        <>
            <div className="fixed top-24 right-14">
                <div className="flex space-x-2">
                    <RoomMenu setSelected={setSelected} />
                    <button
                        className={`btn ${
                            show ? "btn-error" : "btn-info"
                        } text-white`}
                        onClick={() => setShow(!show)}
                    >
                        {show ? "Close" : "Open"} Chatroom
                    </button>
                </div>
            </div>
            {show && (
                <div className="flex m-10">
                    <ChatRoomOneEffect roomId={selected} />
                </div>
            )}
        </>
    )
}
