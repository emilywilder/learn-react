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
}

function DownstreamParent() {
    const data = useSomeAPI()
    // ...
    // ✅ Good: Passing data down to the child
    return <DownstreamChild data={data} />
}

function DownstreamChild({ data }) {
    // ...
}

export default function App() {}
