function Form({ status = 'empty'}) {
    if (status === 'success') {
        return <h1>That's right!</h1>
    }
    return (
        <>
            <h2>City quiz</h2>
            <p>
                In which city is there a billboard that turns air into drinkable water?
            </p>
            <form>
                <textarea disabled={
                    status === 'submitting'
                }/>
                <br />
                <button disabled={
                    status === 'empty' ||
                    status === 'submitting'
                }>
                    Submit
                </button>
                {
                    status === 'error' &&
                    <p className="Error">
                        Good guess but a wrong answer. Try again!
                    </p>
                }
            </form>
        </>
    )
}

export default function App() {
    let statuses = [
        'empty',
        'typing',
        'submitting',
        'success',
        'error'
    ]

    return (
        <>
            {statuses.map(status => (
                <section key={status}>
                    <h4>Form ({status}):</h4>
                    <Form status={status} />
                    <br />
                </section>
            ))}
        </>
    )
}