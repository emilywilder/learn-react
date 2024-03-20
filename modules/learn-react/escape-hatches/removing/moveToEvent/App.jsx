import { useState } from "react"

import { Sun, Moon } from "@/components/svg"
import { ThemeContext } from "./Form"
import InEffectForm from "./InEffectForm"
import InEventForm from "./InEventForm"

function ThemeCheckbox({ checked, onToggle }) {
    return (
        <label className="swap swap-rotate">
            <input type="checkbox" onChange={(e) => onToggle(!checked)} />
            <Sun />
            <Moon />
        </label>
    )
}

function Card({ title, description, children }) {
    const [lightMode, setLightMode] = useState(true)
    const theme = lightMode ? "light" : "dark"
    return (
        <ThemeContext.Provider value={theme}>
            <div className="card shadow-xl bg-base-100 w-72" data-theme={theme}>
                <div className="card-body">
                    <div className="flex justify-between">
                        <h1 className="card-title order-first">{title}</h1>
                        <div className="order-last">
                            <ThemeCheckbox
                                checked={lightMode}
                                onToggle={setLightMode}
                            />
                        </div>
                    </div>

                    <p>{description}</p>
                    <div className="card-actions justify-end">{children}</div>
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
