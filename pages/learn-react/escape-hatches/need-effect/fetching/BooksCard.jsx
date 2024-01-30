export default function BooksCard({ name, results, page }) {
    return (
        <div className="card shadow-xl w-3/4  m-4 p-4">
            <h1 className="card-title">{name}</h1>
            <div className="card-body">
                {results ? (
                    results.map((book) => <Book key={book.id} book={book} />)
                ) : (
                    <div>No books to display</div>
                )}
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
