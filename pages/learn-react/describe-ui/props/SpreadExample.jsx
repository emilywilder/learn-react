import { getImageUrl } from './utils'

export default function App() {
    const person1 = {
        name: 'Katsuko Saruhashi',
        imageId: 'YfeOqp2'
    }

    const person2 = {
        name: 'Aklilu Lemma',
        imageId: 'OKS67lh'
    }

    return (
        <>
            <Profile
                person={person1}
                size={100}
                isSepia={false}
                thickBorder={true}
            />
            <Profile
                person={person2}
                size={120}
                isSepia={true}
                thickBorder={false}
            />
        </>
    )
}

function Avatar({ person, size, isSepia, thickBorder }) {
    let styleString = {}
    if (isSepia) styleString.filter = 'sepia(0.5)'
    if (thickBorder) styleString.border = 'thick solid'
    return (
        <img
            className="avatar"
            style={styleString}
            src={getImageUrl(person)}
            alt={person.name}
            width={size}
            height={size}
        />
    )
}

function Profile({ person, size, isSepia, thickBorder }) {
    return (
        <div className="card">
            <Avatar
                person={person}
                size={size}
                isSepia={isSepia}
                thickBorder={thickBorder}
            />
        </div>
    )
 }