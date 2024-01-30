export default function Booklist({ name, results, page }) {
    return (
        <div className="card shadow-xl w-3/4  m-4 p-4">
            <h1 className="card-title">{name}</h1>
            <div className="card-body">
                <div>{JSON.stringify(results)}</div>
            </div>
        </div>
    )
}
