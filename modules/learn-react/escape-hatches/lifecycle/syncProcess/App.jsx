import { useState } from "react"

import ChatRoomOneEffect from "./ChatRoomOneEffect"
import ChatRoomTwoEffects from "./ChatRoomTwoEffects"
import { RoomMenu, ChatContext, findRoomById } from "./Chat"

function VisitCounts({ counts }) {
    return (
        <>
            <table className="table bg-base-100 text-center">
                <thead>
                    <tr>
                        <td>Method</td>
                        <td>Room</td>
                        <td>Visits</td>
                    </tr>
                </thead>

                <tbody>
                    {Object.entries(counts).map(([method, room]) =>
                        Object.entries(room).map(([roomId, count]) => (
                            <tr key={roomId}>
                                <th>{method}</th>
                                <td>{findRoomById(roomId).name}</td>
                                <td>{count}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    )
}

export default function SyncProcess() {
    const [selected, setSelected] = useState(0)
    const [show, setShow] = useState(true)
    const [oneEffectVisitCounts, setOneEffectVisitCounts] = useState({})
    const [twoEffectVisitCounts, setTwoEffectVisitCounts] = useState({})

    function logVisitHook(visitCounts, setVisitCounts, roomId) {
        const nextVisitCounts = {
            ...visitCounts,
            [roomId]: (visitCounts[roomId] || 0) + 1,
        }
        setVisitCounts(nextVisitCounts)
    }

    return (
        <>
            <div className="fixed top-24 right-14 z-10">
                <div className="flex flex-col space-y-2 items-center">
                    <div className="flex space-x-2 z-30">
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
                    <div className="z-20">
                        <VisitCounts
                            counts={{
                                "One Effect": oneEffectVisitCounts,
                                "Two Effects": twoEffectVisitCounts,
                            }}
                        />
                    </div>
                </div>
            </div>
            {show && (
                <div className="flex m-10 space-x-4">
                    <ChatContext.Provider
                        value={(roomId) =>
                            logVisitHook(
                                oneEffectVisitCounts,
                                setOneEffectVisitCounts,
                                roomId
                            )
                        }
                    >
                        <div className="hover:ring-2 rounded-xl ring-red-500">
                            <ChatRoomOneEffect roomId={selected} />
                        </div>
                    </ChatContext.Provider>
                    <ChatContext.Provider
                        value={(roomId) =>
                            logVisitHook(
                                twoEffectVisitCounts,
                                setTwoEffectVisitCounts,
                                roomId
                            )
                        }
                    >
                        <div className="hover:ring-2 rounded-xl ring-green-500">
                            <ChatRoomTwoEffects roomId={selected} />
                        </div>
                    </ChatContext.Provider>
                </div>
            )}
        </>
    )
}
