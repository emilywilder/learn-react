export default function Card({ children }) {
    return (
        <div className="card shadow-xl bg-base-100 w-72">
            <div className="card-body">{children}</div>
        </div>
    )
}

Card.Title = function CardTitle({ children }) {
    return <h1 className="card-title">{children}</h1>
}

Card.Content = function CardContent({ children }) {
    return <div className="flex flex-col space-y-2">{children}</div>
}

Card.Actions = function CardActions({ children }) {
    return <div className="card-actions justify-end">{children}</div>
}
