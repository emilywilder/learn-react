import { useState } from 'react';

export default function App() {
  const [reverse, setReverse] = useState(false);
  return (
    <>
        {reverse ? (
            <>
                <Field key="last" label="Last name" />
                <Field key="first" label="First name" />
            </>
        ) : (
            <>
                <Field key="first" label="First name" />
                <Field key="last" label="Last name" />
            </>
        )}
        <label>
            <input
                type="checkbox"
                checked={reverse}
                onChange={e => setReverse(e.target.checked)}
            />
            Reverse order
        </label>
    </>
  );
}

function Field({ label }) {
  const [text, setText] = useState('');
  return (
    <label>
      {label}:{' '}
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      />
    </label>
  );
}
