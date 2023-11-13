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
                        <label className="label">First Name</label>
                        <input
                            className="input input-bordered"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Last Name</label>
                        <input
                            className="input input-bordered"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    
                </div>
                <div className="grid justify-start">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
  }

export default function App() {
    return (
        <Form />
    )
}