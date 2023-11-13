import { useEffect, useState } from "react";

function post(url, json) {
    console.log(`POST ${JSON.stringify(json)} to ${url}`)
}

function Form() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    // ✅ Good: This logic should run because the component was displayed
    useEffect(() => {
      post('/analytics/event', { eventName: 'visit_form' });
    }, []);
  
    // 🔴 Avoid: Event-specific logic inside an Effect
    const [jsonToSubmit, setJsonToSubmit] = useState(null);
    useEffect(() => {
      if (jsonToSubmit !== null) {
        post('/api/register', jsonToSubmit);
      }
    }, [jsonToSubmit]);
  
    function handleSubmit(e) {
      e.preventDefault();
      setJsonToSubmit({ firstName, lastName });
    }
    // ...
    return (
        <div className="flex justify-center mt-10">
            <form className="form-control space-y-10">
                <div className="flex space-x-4">
                    <div>
                        <FormInput
                            labelText="First Name"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <FormInput
                            labelText="Last Name"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <button className="btn btn-primary justify-self-start" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
  }

function FormInput({ labelText, placeholder, value, onChange }) {
    return (
        <>
            <label className="label">
                <span className="label-text">{labelText}</span>
            </label>
            <input
                className="input input-bordered"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    )
    
}

export default function App() {
    return (
        <Form />
    )
}