import { useState } from "react"

import ChatRoomOneEffect from "./ChatRoomOneEffect"
import ChatRoomTwoEffects from "./ChatRoomTwoEffects"
import { RoomMenu, ChatContext, findRoomById } from "./Chat"

function VisitCountsFooter({ oneEffect, twoEffects }) {
    return (
        <footer className="footer bg-base-200 fixed bottom-0 p-8 h-48">
            <div className="flex items-center justify-between h-full w-full">
                <h2 className="text-2xl">Visit Counts</h2>
                <div className="divider divider-horizontal" />

                <VisitCountTable caption="One Effect" counts={oneEffect} />
                <VisitCountTable caption="Two Effects" counts={twoEffects} />
            </div>
        </footer>
    )
}

function VisitCountTable({ caption, counts }) {
    return (
        <>
            <table className="table table-xs text-center max-w-40">
                <caption>{caption}</caption>
                <thead>
                    <tr>
                        <td>Room</td>
                        <td>Visits</td>
                    </tr>
                </thead>

                <tbody>
                    {Object.entries(counts).map(([roomId, count]) => (
                        <tr key={roomId}>
                            <td>{findRoomById(roomId).name}</td>
                            <td>{count}</td>
                        </tr>
                    ))}
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
                        <div className="rounded-xl shadow-xl">
                            <RoomMenu setSelected={setSelected} />
                        </div>

                        <button
                            className={`btn text-white shadow-xl ${
                                show ? "btn-error" : "btn-info"
                            }`}
                            onClick={() => setShow(!show)}
                        >
                            {show ? "Close" : "Open"} Chatroom
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-24">
                {show && (
                    <div className="flex m-4 space-x-4">
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
            </div>
            <VisitCountsFooter
                oneEffect={oneEffectVisitCounts}
                twoEffects={twoEffectVisitCounts}
            />
        </>
    )
}
