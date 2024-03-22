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

function Card({ children }) {
    const [lightMode, setLightMode] = useState(true)
    const theme = lightMode ? "light" : "dark"
    return (
        <ThemeContext.Provider value={theme}>
            <div className="card shadow-xl bg-base-100 w-72" data-theme={theme}>
                <div className="absolute top-6 right-6">
                    <ThemeCheckbox
                        checked={lightMode}
                        onToggle={setLightMode}
                    />
                </div>
                <div className="card-body">{children}</div>
            </div>
        </ThemeContext.Provider>
    )
}

Card.Title = function CardTitle({ children }) {
    return <h1 className="card-title order-first">{children}</h1>
}

Card.Content = function HeroContent({ children }) {
    return <p>{children}</p>
}

Card.Actions = function HeroActions({ children }) {
    return <div className="card-actions justify-end">{children}</div>
}

export default function MoveToEvent() {
    return (
        <div className="h-full flex flex-row">
            <div className="basis-1/2">
                <div className="flex flex-col space-y-6 h-full justify-center items-center">
                    <Card>
                        <Card.Title>In Effect</Card.Title>
                        <Card.Content>
                            This form triggers a notification on submit using
                            useEffect().
                            <br />
                            Observe that after the form has been submitted,
                            changing the theme submits again.
                        </Card.Content>
                        <Card.Actions>
                            <InEffectForm />
                        </Card.Actions>
                    </Card>
                    <Card>
                        <Card.Title>In Event</Card.Title>
                        <Card.Content>
                            This form triggers a notification on submit using
                            the event of the button press.
                            <br />
                            This method ties submitting with the event of the
                            button press and doesn&apos;t submit again upon
                            theme change.
                        </Card.Content>
                        <Card.Actions>
                            <InEventForm />
                        </Card.Actions>
                    </Card>
                </div>
            </div>
        </div>
    )
}
