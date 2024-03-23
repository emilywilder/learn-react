import { createServer } from "miragejs"

import LOCATION_DATA from "./location_data.json"

export const getCountries = () => Array.from(Object.keys(LOCATION_DATA))

const delay = 2000

createServer({
    routes() {
        // namespace issue resolution taken from
        // https://github.com/miragejs/miragejs/issues/651#issuecomment-713283963

        /* urls to handle
            /api/cities?country=${country}
            /api/areas?city=${city}
        */
        this.namespace = "api"

        this.get("/countries", () => fetchCountries(), { timing: delay })
        this.get(
            "/cities",
            (schema, request) => fetchCities(request.queryParams.country),
            { timing: delay }
        )
        this.get(
            "/areas",
            (schema, request) => fetchAreas(request.queryParams.city),
            { timing: delay }
        )
        this.namespace = ""
        this.passthrough()
    },
})

async function fetchCountries() {
    const locationData = LOCATION_DATA
    return getCountries()
}

async function fetchCities(country) {
    const locationData = LOCATION_DATA
    return Array.from(Object.keys(locationData[country] || {}))
}

async function fetchAreas(city) {
    const locationData = LOCATION_DATA
    const countries = getCountries()
    const country = countries.filter((c) => city in locationData[c])[0]
    return locationData[country][city]
}
