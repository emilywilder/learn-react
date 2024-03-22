import { useEffect, useState } from "react"

import ShippingFormRender from "./Forms"

function ShippingForm({ country }) {
    const [cities, setCities] = useState(null)
    const [city, setCity] = useState(null)
    const [areas, setAreas] = useState(null)

    useEffect(() => {
        let ignore = false
        fetch(`/api/cities?country=${country}`)
            .then((response) => response.json())
            .then((json) => {
                if (!ignore) {
                    setCities(json)
                }
            })
        // 🔴 Avoid: A single Effect synchronizes two independent processes
        if (city) {
            fetch(`/api/areas?city=${city}`)
                .then((response) => response.json())
                .then((json) => {
                    if (!ignore) {
                        setAreas(json)
                    }
                })
        }
        return () => {
            ignore = true
        }
    }, [country, city]) // ✅ All dependencies declared

    // ...
    return (
        <ShippingFormRender
            cities={cities}
            setCities={setCities}
            city={city}
            setCity={setCity}
            areas={areas}
            setAreas={setAreas}
        />
    )
}

export default ShippingForm
