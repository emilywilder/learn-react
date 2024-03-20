import { ThemeContext } from "./Form"

import InEffectForm from "./InEffectForm"
import InEventForm from "./InEventForm"
import { useState } from "react"

export function ThemeMenu({ options, setSelected }) {
    return (
        <details className="dropdown dropdown-bottom">
            <summary className="btn btn-primary w-24">Themes</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
                {options.map((option) => (
                    <li key={option.id}>
                        <a onClick={() => setSelected(option.name)}>
                            <span>{option.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </details>
    )
}

function Card({ title, description, children }) {
    const themes = [
        { id: 0, name: "light" },
        { id: 1, name: "dark" },
    ]
    const [theme, setTheme] = useState(themes.find((t) => t.name === "light"))
    return (
        <ThemeContext.Provider value={theme}>
            <div className="card shadow-xl bg-base-100 w-72" data-theme={theme}>
                <div className="card-body">
                    <h1 className="card-title">{title}</h1>
                    <p>{description}</p>
                    <div className="card-actions justify-end">
                        <ThemeMenu options={themes} setSelected={setTheme} />
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
