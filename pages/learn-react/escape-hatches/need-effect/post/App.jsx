import { createContext, useContext, useEffect, useState } from "react";

const formContext = createContext()

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
    const post = useContext(formContext)
    return (
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

function Registry() {
    const [registryList, setRegistryList] = useState([])
    console.debug(`registryList: ${JSON.stringify(registryList)}`)

    function post(url, json) {
        console.debug(`POST ${JSON.stringify(json)} to ${url}`)
        switch (url) {
            case '/analytics/event':
                console.log(`${JSON.stringify(json)} sent to analytics`)
                break
            case '/api/register':
                setRegistryList([
                    ...registryList,
                    {
                        ...json,
                        id: registryList.length
                    }
                ])
                console.log(`registered ${JSON.stringify(json)}`)
                break
            default:
                throw Error(`Unknown path: ${url}`)
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex lg:flex-row">
                <div className="text-left">
                    <h1 className="text-5xl font-bold">Registry</h1>
                    <div className="py-6 overflow-x-hidden">
                        {registryList.length ? (
                            <table className="table bg-base-100">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registryList.map(n => (
                                        <tr key={n.id}>
                                            <th>{n.id + 1}</th>
                                            <td>{n.firstName} {n.lastName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            "There are currently no names registered."
                        )}
                    </div>
                </div>
                <formContext.Provider value={post}>
                    <Form />
                </formContext.Provider>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <Registry />
    )
}