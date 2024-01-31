import { NUM_PAGES } from "./utilities"

export default function BooksCard({ name, results, page, onNextPageClick }) {
    return (
        <div className="card shadow-xl w-3/4  m-4 p-4">
            <div className="card-body">
                <h1 className="card-title">{name}</h1>
                {!Array.isArray(results) || !results.length ? (
                    <div>No books to display</div>
                ) : (
                    results.map((book) => <Book key={book.id} book={book} />)
                )}
                <div className="card-actions justify-end items-center">
                    <div className="mr-2">Page {page}</div>
                    <button
                        className="btn"
                        onClick={onNextPageClick}
                        disabled={page >= NUM_PAGES}
                    >
                        {"Next"}
                    </button>
                </div>
            </div>
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
