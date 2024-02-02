import { useEffect, useState } from "react"
import { Pagination, SearchResultsRender } from "./BookSearch"

export default function SearchResults({ query }) {
    const [page, setPage] = useState(1)
    const params = new URLSearchParams({ query, page })
    const results = useData(`/api/search?${params}`)

    function handleNextPageClick() {
        setPage(page + 1)
    }
    // ...
    console.log(`HookFetch::SearchResults(): ${JSON.stringify(results)}`)
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
