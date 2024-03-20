import { ThemeContext } from "./Form"

import InEffectForm from "./InEffectForm"
import InEventForm from "./InEventForm"
import { useState } from "react"

function Card({ title, description, children }) {
    const [theme, setTheme] = useState("light")
    return (
        <ThemeContext.Provider value={theme}>
            <div className="card shadow-xl bg-base-100 w-72" data-theme={theme}>
                <div className="card-body">
                    <h1 className="card-title">{title}</h1>
                    <p>{description}</p>
                    <div className="card-actions justify-end">
                        <select onChange={(e) => setTheme(e.target.value)}>
                            <option>light</option>
                            <option>dark</option>
                        </select>
                        {children}
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    )
}

export default function MoveToEvent() {
    return (
        <div className="flex flex-col space-y-6 pt-20 m-4">
            <Card
                title={"In Effect"}
                description={
                    "This form triggers a notification on submit using useEffect()."
                }
            >
                <InEffectForm />
            </Card>
            <Card
                title={"In Event"}
                description={
                    "This form triggers a notification on submit using the event of the button press."
                }
            >
                <InEventForm />
            </Card>
        </div>
    )
}
