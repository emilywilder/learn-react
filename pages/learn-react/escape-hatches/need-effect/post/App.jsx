import { createContext, useContext, useEffect, useState } from "react";

const formContext = createContext()

function BadForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    // ✅ Good: This logic should run because the component was displayed
    useEffect(() => {
      post('/analytics/event', { eventName: 'visit_form' });
    }, []); // eslint-disable-line
  
    // 🔴 Avoid: Event-specific logic inside an Effect
    const [jsonToSubmit, setJsonToSubmit] = useState(null);
    useEffect(() => {
      if (jsonToSubmit !== null) {
        post('/api/register', jsonToSubmit);
      }
    }, [jsonToSubmit]); // eslint-disable-line
  
    function handleSubmit(e) {
      e.preventDefault();
      setJsonToSubmit({ firstName, lastName });
    }
    // ...
    const post = useContext(formContext)
    return (
        <FormContent
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            onClick={handleSubmit}
        />
    )
}

function GoodForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    // ✅ Good: This logic runs because the component was displayed
    useEffect(() => {
      post('/analytics/event', { eventName: 'visit_form' });
    }, []);
  
    function handleSubmit(e) {
      e.preventDefault();
      // ✅ Good: Event-specific logic is in the event handler
      post('/api/register', { firstName, lastName });
    }
    // ...
    const post = useContext(formContext)
    return (
        <FormContent
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            onClick={handleSubmit}
        />
    )
}

function FormContent({ firstName, setFirstName, lastName, setLastName, onClick }) {
    return (
        <div className="card shadow-2xl bg-base-100">
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
                    <button className="btn btn-primary" onClick={onClick}>
                        Register
                    </button>
                </div>
            </form>
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

function Registry({ Form, outlineColor }) {
    const [registryList, setRegistryList] = useState([])    
    const [analyticsSent, setAnalyticsSent] = useState(false)

    console.debug(`registryList: ${JSON.stringify(registryList)}`)
    console.debug(`analyticsSent: ${analyticsSent}`)

    function post(url, json) {
        console.debug(`POST ${JSON.stringify(json)} to ${url}`)
        switch (url) {
            case '/analytics/event':
                setAnalyticsSent(true)
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
        <div className={`outline ${outlineColor} rounded-xl m-8 overflow-hidden`}>
        <div className="bg-base-200">
            <div className="flex flex-col items-center">
                <div className="text-5xl font-bold p-10">Amazing Event</div>
                <div className="flex flex-shrink-0 space-x-10">
                    <div>
                        <formContext.Provider value={post}>
                            <Form />
                        </formContext.Provider>
                    </div>
                    <div className="m-4 max-h-80 overflow-hidden">
                        <RegistryList registryList={registryList}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-end p-4">
                <label className="label space-x-4">
                    <span className="label-text font-thin">Analytics sent</span> 
                    <input
                        className="checkbox checkbox-xs checkbox-secondary"
                        type="checkbox"
                        checked={analyticsSent}
                        readOnly
                    />
                </label>
            </div>
        </div>
        </div>
    )
}

function RegistryList({ registryList }) {
    return (
        <div className="flex flex-col items-center space-y-4">
            <h1 className="font-bold">Registry list</h1>
            <div className="overflow-scroll min-w-[20em] rounded-xl max-h-60">
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
                <p className="mt-10">There are currently no names registered.</p>
            )}
            </div>
        </div>
    )
}

export default function App() {
    return (
        <div className="min-h-screen bg-base-200 pt-4">
                <Registry Form={BadForm} outlineColor={"outline-red-500"} />
                <Registry Form={GoodForm} outlineColor={"outline-green-500"} />
        </div>
    )
}