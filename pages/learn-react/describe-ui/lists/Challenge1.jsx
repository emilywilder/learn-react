import { people } from './data.js';
import { getImageUrl } from './utils.jsx';

function isChemist(person) {
    return person.profession === 'chemist'
}

function ListItems({ people }) {
    const listItems = people.map(person =>
        <li key={person.id}>
        <img
            src={getImageUrl(person)}
            alt={person.name}
        />
        <p>
            <b>{person.name}:</b>
            {' ' + person.profession + ' '}
            known for {person.accomplishment}
        </p>
        </li>
    )
    return (
        <ul>
          {listItems}
        </ul>
      )
}

export default function List() {
  return (
    <article>
      <h1>Chemists</h1>
      <ListItems people={people.filter(person => isChemist(person))} />
      <h1>Everyone Else</h1>
      <ListItems people={people.filter(person => !isChemist(person))} />
    </article>
  )
}