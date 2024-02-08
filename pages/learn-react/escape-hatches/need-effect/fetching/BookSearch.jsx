import { useState } from "react"

export default function BookSearch({ name, SearchResults }) {
    const [searchText, setSearchText] = useState("")
    const [searchBy, setSearchBy] = useState("author")
    const searchByOptions = ["author", "title"]

    function handleChange(e) {
        setSearchText(e.target.value)
    }

    function handleSelect(e) {
        setSearchBy(e.target.value)
    }

    console.debug(`searchBy: ${searchBy}`)
    console.debug(`searchText: ${searchText}`)

    return (
        <div className="card shadow-xl w-3/4  m-4 p-4">
            <div className="card-body">
                <h1 className="card-title">{name}</h1>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Search for a book by</span>
                        <select
                            className="select select-ghost"
                            onChange={handleSelect}
                        >
                            <option value="author" defaultValue>
                                Author
                            </option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleChange}
                    />
                </label>
                <SearchResults query={`${searchBy}=${searchText}`} />
            </div>
        </div>
    )
}

function getValueFromResults(results, key) {
    return results
        ? Object.keys(results).includes(key)
            ? results[key]
            : []
        : []
}

export function SearchResultsRender({ results, children }) {
    const books = getValueFromResults(results, "books")
    return (
        <div className="mt-2">
            {!Array.isArray(books) || !books ? (
                <div>No books found</div>
            ) : (
                books.map((book) => <Book key={book.id} book={book} />)
            )}
            {children}
        </div>
    )
}

export function Pagination({
    results,
    page,
    onPrevPageClick,
    onNextPageClick,
}) {
    const books = getValueFromResults(results, "books")
    const pages = getValueFromResults(results, "pages")
    const numRecords = books.length

    console.debug(`Pagination::pages = ${pages}`)
    return (
        <div className="card-actions justify-end items-center m-2">
            {numRecords > 0 ? (
                <>
                    <button
                        className="btn"
                        onClick={onPrevPageClick}
                        disabled={page <= 1}
                    >
                        {"Prev"}
                    </button>
                    <div className="mx-2">Page {page}</div>
                    <button
                        className="btn"
                        onClick={onNextPageClick}
                        disabled={page >= pages}
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
