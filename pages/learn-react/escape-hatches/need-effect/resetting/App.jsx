import { useEffect, useState } from "react"

function BadProfilePage({ userId }) {
    const [comment, setComment] = useState('')

    // 🔴 Avoid: Resetting state on prop change in an Effect
    useEffect(() => {
        setComment('')
    }, [userId])
    // ...
    const user = users.find((u) => u.id === userId)
    function handleChange(e) { setComment(e.target.value) }
    
    return <ProfileInfo user={user} handleChange={handleChange} />
}

function GoodProfilePage({ userId }) {
    return (
        <Profile
            userId={userId}
            key={userId}
        />
    )
}

function Profile({ userId }) {
    // ✅ This and any other state below will reset on key change automatically
    const [comment, setComment] = useState('')
    // ...
    const user = users.find((u) => u.id === userId)
    function handleChange(e) { setComment(e.target.value) }
    
    return <ProfileInfo user={user} handleChange={handleChange} />
}

function ProfileInfo({ user, handleChange }) {
    return (
        <div className="px-3">
            <div className="pb-3 text-2xl">Hi! I&apos;m {user.name}!</div>
            <div>Leave a comment:</div>
            <textarea
                className="border-2"
                onChange={handleChange}
            />
        </div>
    )
}

export default function App() {
    const [selectedId, setSelectedId] = useState(1)
    
    return (
        <div className="font-sans ms-3" >
            <form>
                <div className="flex mt-4 mb-6 pb-6">
                    {users.map((u) => (
                        <div className="flex text-sm" key={u.id} >
                            <label>
                                <input
                                    className="sr-only peer"
                                    type="radio"
                                    name={u.name}
                                    value={u.name}
                                    checked={u.id === selectedId ? 'checked' : ''}
                                    onChange={() => setSelectedId(u.id)}
                                />
                                <div className="w-flex px-2 h-12 rounded-lg flex items-center justify-center peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white hover:bg-slate-700 hover:text-white hover:font-semibold">
                                    {u.name}
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </form>
            <div className="grid grid-cols-3 gap-4 place-items-center">
                <div className="text-red-700">Don&apos;t do this:</div>
                <div className="col-span-2">
                    <BadProfilePage userId={selectedId} />
                </div>                
                <div className="text-green-700">Do this:</div>
                <div className="col-span-2">
                    <GoodProfilePage userId={selectedId} />
                </div>
                
            </div>
        </div>
    )
}

const users = [
    {
        id: 0,
        name: 'Zero',
    },
    {
        id: 1,
        name: 'One',
    },
    {
        id: 2,
        name: 'Two',
    },
    {
        id: 3,
        name: 'Three',
    },
]