import { useState } from "react";
import Counter from "./Challenge3-Counter";

export default function Form() {
    const [show, setShow] = useState(false)

    return (
        <>
            <button onClick={
                () => setShow(s => !s)
            }>
                {show ? 'Hide' : 'Show'} counter
            </button>
            <br />
            <hr />
            {show && <Counter />}
        </>
    )
}