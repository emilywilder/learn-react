import { useEffect, useState } from "react"

import ShippingFormRender from "./Forms"

function ShippingForm({ country }) {
    const [cities, setCities] = useState(null)
    useEffect(() => {
        let ignore = false
        fetch(`/api/cities?country=${country}`)
            .then((response) => response.json())
            .then((json) => {
                if (!ignore) {
                    setCities(json)
                }
            })
        return () => {
            ignore = true
        }
    }, [country]) // ✅ All dependencies declared

    const [city, setCity] = useState(null)
    const [areas, setAreas] = useState(null)
    useEffect(() => {
        if (city) {
            let ignore = false
            fetch(`/api/areas?city=${city}`)
                .then((response) => response.json())
                .then((json) => {
                    if (!ignore) {
                        setAreas(json)
                    }
                })
            return () => {
                ignore = true
            }
        }
    }, [city]) // ✅ All dependencies declared

    // ...
    return (
        <ShippingFormRender
            cities={cities}
            city={city}
            setCity={setCity}
            areas={areas}
            setAreas={setAreas}
        />
    )
}
export default ShippingForm
