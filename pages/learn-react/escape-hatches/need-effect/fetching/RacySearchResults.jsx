import { useEffect, useState } from "react"
import { fetchResults } from "./utilities"
import { Pagination, SearchResultsRender } from "./BookSearch"

export default function SearchResults({ query }) {
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
    console.log(`RacyFetch::SearchResults(): ${JSON.stringify(results)}`)
    return (
        <SearchResultsRender results={results}>
            <Pagination
                results={results}
                page={page}
                onNextPageClick={handleNextPageClick}
            />
        </SearchResultsRender>
    )
}
