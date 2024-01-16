import { useEffect, useState } from "react"

function useSomeAPI() {
    return { id: 0, name: "api_data" }
}

function UpstreamParent() {
    const [data, setData] = useState(null)
    // ...
    return <UpstreamChild onFetched={setData} />
}

function UpstreamChild({ onFetched }) {
    const data = useSomeAPI()
    // 🔴 Avoid: Passing data to the parent in an Effect
    useEffect(() => {
        if (data) {
            onFetched(data)
        }
    }, [onFetched, data])
    // ...
    return (
        <div>
            <h1>UpstreamChild</h1>
            <p>{data.name}</p>
        </div>
    )
}

function DownstreamParent() {
    const data = useSomeAPI()
    // ...
    // ✅ Good: Passing data down to the child
    return <DownstreamChild data={data} />
}

function DownstreamChild({ data }) {
    // ...
    return (
        <div>
            <h1>DownstreamChild</h1>
            <p>{data.name}</p>
        </div>
    )
}

export default function App() {
    return (
        <>
            <UpstreamParent />
            <DownstreamParent />
        </>
    )
}
