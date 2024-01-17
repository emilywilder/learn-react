import { useEffect, useRef, useState } from "react"

function useSomeAPI() {
    return { id: 0, name: "api_data" }
}

function Card({ title, children }) {
    return (
        <div className="card w-96 bg-base-100 shadow-lg m-4">
            <div className="card-body">
                <div className="card-title">{title}</div>
                {children}
            </div>
        </div>
    )
}

function ShowData({ data, count }) {
    return (
        <div>
            <p>API data: {JSON.stringify(data)}</p>
            <p>Run {count} times.</p>
        </div>
    )
}

function UpstreamParent() {
    const [data, setData] = useState(null)
    // ...
    return (
        <Card title="Upstream method">
            <UpstreamChild onFetched={setData} />
        </Card>
    )
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

    const countRef = useRef(0)

    useEffect(() => {
        countRef.current++
    }, [])

    return <ShowData data={data} count={countRef.current} />
}

function DownstreamParent() {
    const data = useSomeAPI()
    // ...
    // ✅ Good: Passing data down to the child
    return (
        <Card title="Downstream method">
            <DownstreamChild data={data} />
        </Card>
    )
}

function DownstreamChild({ data }) {
    // ...

    const countRef = useRef(0)

    useEffect(() => {
        countRef.current++
    }, [])

    return <ShowData data={data} count={countRef.current} />
}

export default function App() {
    return (
        <div className="w-full h-screen bg-base-200 p-4">
            <UpstreamParent />
            <DownstreamParent />
        </div>
    )
}
