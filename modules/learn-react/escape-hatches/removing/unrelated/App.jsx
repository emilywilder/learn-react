import { useState } from "react"

import "./utilities"
import Card from "./Card"
import { ListboxSelect } from "./Forms"
import Combined from "./Combined"
import Separated from "./Separated"
import { getCountries } from "./utilities"

function CombinedCard() {
    const countries = getCountries()
    const [selected, setSelected] = useState(null)

    return (
        <Card>
            <Card.Title>Combined</Card.Title>
            <Card.Content>
                This example combines both fetches within the same useEffect().
                <ListboxSelect
                    options={countries}
                    selected={selected || "Select a country"}
                    setSelected={setSelected}
                />
                <Combined key={selected} country={selected} />
            </Card.Content>
        </Card>
    )
}

function SeparateCard() {
    const countries = getCountries()
    const [selected, setSelected] = useState(null)

    return (
        <Card>
            <Card.Title>Separated</Card.Title>
            <Card.Content>
                This example separates each fetch into their own useEffect().
                <ListboxSelect
                    options={countries}
                    selected={selected || "Select a country"}
                    setSelected={setSelected}
                />
                <Separated key={selected} country={selected} />
            </Card.Content>
        </Card>
    )
}

export default function Unrelated() {
    return (
        <div className="flex flex-col h-full items-center justify-evenly">
            <CombinedCard />
            <SeparateCard />
        </div>
    )
}
