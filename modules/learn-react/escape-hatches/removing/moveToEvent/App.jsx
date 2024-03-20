import { ToastContainer } from "react-toastify"

import InEffectForm from "./InEffectForm"
import InEventForm from "./InEventForm"

function Card({ title, description, children }) {
    return (
        <div className="card shadow-xl bg-base-100 w-72">
            <div className="card-body">
                <h1 className="card-title">{title}</h1>
                <p>{description}</p>
                <div className="card-actions justify-end">{children}</div>
            </div>
        </div>
    )
}

export default function MoveToEvent() {
    return (
        <div className="flex flex-col space-y-6 mt-20 m-4">
            <Card
                title={"In Effect"}
                description={
                    "This form triggers a notification on submit using useEffect()."
                }
            >
                <ToastContainer id={0} />
                <InEffectForm />
            </Card>
            <Card
                title={"In Event"}
                description={
                    "This form triggers a notification on submit using the event of the button press."
                }
            >
                <ToastContainer id={1} />
                <InEventForm />
            </Card>
        </div>
    )
}
