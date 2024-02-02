import { useState } from "react"
import { NUM_PAGES } from "./utilities"

export default function BookSearch({ name, SearchResults }) {
    const [searchText, setSearchText] = useState("")

    function handleChange(e) {
        setSearchText(e.target.value)
    }

    return (
        <div className="card shadow-xl w-3/4  m-4 p-4">
            <div className="card-body">
                <h1 className="card-title">{name}</h1>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">
                            Search for a book by author
                        </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleChange}
                    />
                </label>
                <SearchResults query={`author=${searchText}`} />
            </div>
        </div>
    )
}

export function SearchResultsRender({ results, children }) {
    return (
        <div className="mt-2">
            {!Array.isArray(results) || !results.length ? (
                <div>No books found</div>
            ) : (
                results.map((book) => <Book key={book.id} book={book} />)
            )}
            {children}
        </div>
    )
}

export function Pagination({ results, page, onNextPageClick }) {
    const numRecords = results ? results.length : 0
    return (
        <div className="card-actions justify-end items-center">
            {numRecords > 0 ? (
                <>
                    <div className="mr-2">Page {page}</div>
                    <button
                        className="btn"
                        onClick={onNextPageClick}
                        disabled={page >= NUM_PAGES}
                    >
                        {"Next"}
                    </button>
                </>
            ) : null}
        </div>
    )
}

function Book({ book }) {
    return (
        <div>
            <span className="mr-4">📖</span>
            <span className="text-lg font-serif font-semibold">
                {book.title}
            </span>{" "}
            by <span className="font-sans">{book.author}</span>
        </div>
    )
}
