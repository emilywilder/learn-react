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
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex lg:flex-row">
                <div className="text-left">
                    <h1 className="text-5xl font-bold">Registry</h1>
                    <p className="py-6">List of names</p>
                </div>
                <div className="indicator">
                    <span className="indicator-item badge badge-secondary"></span>
                    <div className="card max-w-sm shadow-2xl bg-base-100 relative">
                    <form className="card-body">
                        <FormInput
                            labelText="First Name"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <FormInput
                            labelText="Last Name"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
  }

function FormInput({ labelText, placeholder, value, onChange }) {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{labelText}</span>
            </label>
            <input
                type="text"
                className="input input-bordered"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    )
    
}

export default function App() {
    return (
        <Form />
    )
}