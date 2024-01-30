import { useEffect, useState } from "react"
import { fetchResults } from "./utilities"

function SearchResults({ query }) {
    const [results, setResults] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        // 🔴 Avoid: Fetching without cleanup logic
        fetchResults(query, page).then((json) => {
            setResults(json)
        })
    }, [query, page])

    function handleNextPageClick() {
        setPage(page + 1)
    }
    // ...
    console.log(`RacyFetch::SearchResults(): ${results}`)
}

export default SearchResults
