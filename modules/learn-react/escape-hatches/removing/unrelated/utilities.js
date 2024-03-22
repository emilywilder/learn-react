import { createServer } from "miragejs"

import LOCATION_DATA from "./location_data.json"

createServer({
    routes() {
        // namespace issue resolution taken from
        // https://github.com/miragejs/miragejs/issues/651#issuecomment-713283963

        /* urls to handle
            /api/cities?country=${country}
            /api/areas?city=${city}
        */
        this.namespace = "api"
        this.get("/cities", (schema, request) =>
            fetchCities(request.queryParams.country)
        )
        this.get("/areas", (schema, request) =>
            fetchAreas(request.queryParams.city)
        )
        this.namespace = ""
        this.passthrough()
    },
})

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchCities(country) {
    const locationData = LOCATION_DATA
    return Array.from(Object.keys(locationData[country] || {}))
}

async function fetchAreas(country, city) {
    const locationData = LOCATION_DATA
    debugger
}
