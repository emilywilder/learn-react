import { useState } from "react"

export default function EditContact({ savedContact, onSave }) {
    const [name, setName] = useState(savedContact.name)
    const [email, setEmail] = useState(savedContact.email)

    const [prevContact, setPrevContact] = useState(savedContact)
    if (savedContact !== prevContact) {
        setPrevContact(savedContact)
        setName(savedContact.name)
        setEmail(savedContact.email)
    }

    return (
        <section>
            <label>
                Name:{" "}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Email:{" "}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <button
                onClick={() => {
                    const updatedData = {
                        id: savedContact.id,
                        name: name,
                        email: email,
                    }
                    onSave(updatedData)
                }}
            >
                Save
            </button>
            <button
                onClick={() => {
                    setName(savedContact.name)
                    setEmail(savedContact.email)
                }}
            >
                Reset
            </button>
        </section>
    )
}
