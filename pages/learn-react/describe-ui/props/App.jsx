import Avatar from "./Avatar"

function Card({ children }) {
    return (
        <div className="card">
            {children}
        </div>
    )
}

export default function Profile() {
    return (
        <Card>
            <h1>Katsuko Saruhashi</h1>
            <Avatar
                size={100}
                person={{
                    name: 'Katsuko Saruhashi',
                    imageId: 'YfeOqp2'
                }}
            />
        </Card>
    )
}