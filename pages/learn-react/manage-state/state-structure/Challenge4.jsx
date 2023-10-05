import { useState } from 'react';
import { letters } from './Challenge4-data.js';
import Letter from './Challenge4-Letter';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const selectedCount = selectedIds.size

  function handleToggle(toggledId) {
    const nextIds = new Set(selectedIds)
    if (nextIds.has(toggledId)) {
        nextIds.delete(toggledId)
    } else {
        nextIds.add(toggledId)
    }
    setSelectedIds(nextIds)
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              selectedIds.has(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}
