import { useState } from 'react';

export default function Chat({contact, messages, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={messages[contact.id]}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            contactId: contact.id,
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${messages[contact.id]}" to ${contact.email}`);
          dispatch({
            type: 'sent_message',
            contactId: contact.id,
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
