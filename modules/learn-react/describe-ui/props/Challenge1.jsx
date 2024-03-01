import { getImageUrl } from './Challenge1-utils.jsx';

function Profile({ person }) {
    const listDetails = person.details.map((details, count) => {
        return (
            <li key={count}>
                <b>{details.title} </b>
                {details.description}
            </li>
        )
    })
    return (
        <section className="profile">
        <h2>{person.name}</h2>
        <img
          className="avatar"
          src={getImageUrl(person.imageId)}
          alt={person.name}
          width={70}
          height={70}
        />
        <ul>
            {listDetails}
        </ul>
      </section>
    )
}

export default function Gallery() {
    // could be moved into a Person component
    const people = [
        {
            name: "Maria Skłodowska-Curie",
            imageId: "szV5sdG",
            details: [
                {
                    title: "Profession:",
                    description: "physicist and chemist"
                },
                {
                    title: "Awards: 4",
                    description: "(Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)"
                },
                {
                    title: "Discovered:",
                    description: "polonium (element)"
                }
            ]
        },
        {
            name: "Katsuko Saruhashi",
            imageId: "YfeOqp2",
            details: [
                {
                    title: "Profession:",
                    description: "geochemist"
                },
                {
                    title: "Awards: 2",
                    description: "(Miyake Prize for geochemistry, Tanaka Prize)"
                },
                {
                    title: "Discovered:",
                    description: "a method for measuring carbon dioxide in seawater"
                }
            ]
        }
    ]
    const listPeople = people.map((person, count) => {
        return (
            <Profile person={person} key={count}/>
        )}
    )
  return (
    <div>
        <h1>Notable Scientists</h1>
        {listPeople}
    </div>
  );
}
