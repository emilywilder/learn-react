import { useEffect, useState } from "react"
import { fetchResults } from "./utilities"
import { Pagination, SearchResultsRender } from "./BookSearch"

export default function SearchResults({ query }) {
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
    function handlePrevPageClick() {
        setPage(page - 1)
    }

    return (
        <SearchResultsRender results={results}>
            <Pagination
                results={results}
                page={page}
                onPrevPageClick={handlePrevPageClick}
                onNextPageClick={handleNextPageClick}
            />
        </SearchResultsRender>
    )
}
