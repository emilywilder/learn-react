import { useEffect, useState } from "react"
import { fetchResults } from "./utilities"

function SearchResults({ query }) {
    const [results, setResults] = useState([])
    const [page, setPage] = useState(1)
    useEffect(() => {
        let ignore = false
        fetchResults(query, page).then((json) => {
            if (!ignore) {
                setResults(json)
            }
        })
        return () => {
            ignore = true
        }
    }, [query, page])

    function handleNextPageClick() {
        setPage(page + 1)
    }
    // ...
    console.log(`CleanupFetch::SearchResults(): ${results}`)
}

export default SearchResults
