import { useEffect, useState } from "react";
import { fetchBio } from "./Challenge4-api";

export default function Page() {
    const [person, setPerson] = useState('Alice')
    const [bio, setBio] = useState(null)

    useEffect(() => {
        let ignoreFetch = false
        setBio(null)
        fetchBio(person).then(result => {
            !ignoreFetch && setBio(result)
        })
        return () => ignoreFetch = true
    }, [person])

    return (
        <>
            <select value={person} onChange={e => {
                setPerson(e.target.value)
            }}>
                <option value="Alice">Alice</option>
                <option value="Bob">Bob</option>
                <option value="Taylor">Taylor</option>
            </select>
            <hr />
            <p><i>{bio ?? 'Loading...'}</i></p>
        </>
    )
}