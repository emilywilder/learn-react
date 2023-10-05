import { useState } from 'react';
import { initialLetters } from './Challenge3-data.js';
import Letter from './Challenge3-Letter';

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedLetterId, setHighlightedLetterId] = useState(null);

  function handleHover(letter) {
    setHighlightedLetterId(letter.id);
  }

  function handleStar(starred) {
    setLetters(letters.map(letter => {
      if (letter.id === starred.id) {
        return {
          ...letter,
          isStarred: !letter.isStarred
        };
      } else {
        return letter;
      }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={
              letter.id === highlightedLetterId
            }
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}
