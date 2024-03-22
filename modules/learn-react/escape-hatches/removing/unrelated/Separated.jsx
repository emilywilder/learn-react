import { useEffect, useState } from "react"

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
}
export default ShippingForm
