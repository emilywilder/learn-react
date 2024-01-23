import { useEffect, useState } from "react"
import { fetchResults } from "./utilities"

const fetch = fetchResults

function SearchResults({ query }) {
    const [page, setPage] = useState(1)
    const params = new URLSearchParams({ query, page })
    const results = useData(`/api/search?${params}`)

    function handleNextPageClick() {
        setPage(page + 1)
    }
    // ...
}

function useData(url) {
    const [data, setData] = useState(null)
    useEffect(() => {
        let ignore = false
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                if (!ignore) {
                    setData(json)
                }
            })
        return () => {
            ignore = true
        }
    }, [url])
    return data
}

export default SearchResults
