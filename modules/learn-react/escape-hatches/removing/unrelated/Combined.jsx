import { useEffect, useState } from "react"

import ShippingFormRender from "./Forms"

function ShippingForm({ country }) {
    const [cities, setCities] = useState(null)
    const [city, setCity] = useState(null)
    const [areas, setAreas] = useState(null)

    useEffect(() => {
        let ignore = false
        setFetchingCities(true) // NOT IN EXAMPLE
        fetch(`/api/cities?country=${country}`)
            .then((response) => response.json())
            .then((json) => {
                if (!ignore) {
                    setFetchingCities(false) // NOT IN EXAMPLE
                    setCities(json)
                }
            })
        // 🔴 Avoid: A single Effect synchronizes two independent processes
        if (city) {
            setFetchingAreas(true) // NOT IN EXAMPLE
            fetch(`/api/areas?city=${city}`)
                .then((response) => response.json())
                .then((json) => {
                    if (!ignore) {
                        setFetchingAreas(false) // NOT IN EXAMPLE
                        setAreas(json)
                    }
                })
        }
        return () => {
            ignore = true
        }
    }, [country, city]) // ✅ All dependencies declared

    // ...
    const [fetchingCities, setFetchingCities] = useState(false)
    const [fetchingAreas, setFetchingAreas] = useState(false)

    return (
        <ShippingFormRender
            country={country}
            cities={cities}
            city={city}
            setCity={setCity}
            areas={areas}
            fetchingCities={fetchingCities}
            fetchingAreas={fetchingAreas}
        />
    )
}

export default ShippingForm
