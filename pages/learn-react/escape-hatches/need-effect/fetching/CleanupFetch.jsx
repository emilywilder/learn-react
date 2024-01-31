import { useEffect, useState } from "react"
import { fetchResults } from "./utilities"
import BooksCard from "./BooksCard"

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
    console.log(`CleanupFetch::SearchResults(): ${JSON.stringify(results)}`)
    return (
        <>
            <BooksCard
                name={"CleanupFetch"}
                results={results}
                page={page}
                onNextPageClick={handleNextPageClick}
            />
        </>
    )
}

export default SearchResults
