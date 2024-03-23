import { useState } from "react"

import Card from "./Card"
import { ListboxSelect } from "./Forms"
import { getCountries } from "./utilities"

export default function SublessonCard({ title, Sublesson, children }) {
    const countries = getCountries()
    const [selected, setSelected] = useState(null)

    return (
        <Card>
            <Card.Title>{title}</Card.Title>
            <Card.Content>
                <p className="tracking-tight md:tracking-normal lg:tracking-wide break-words">
                    {children}
                </p>
                <div className="z-20">
                    <ListboxSelect
                        options={countries}
                        selected={selected || "Select a country"}
                        setSelected={setSelected}
                    />
                </div>
                <div className="z-10">
                    <Sublesson key={selected} country={selected} />
                </div>
            </Card.Content>
        </Card>
    )
}
