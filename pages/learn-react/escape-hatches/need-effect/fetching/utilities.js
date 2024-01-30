import { createServer } from "miragejs"

export const PARAMS_STRING =
    "sublesson=fetching&lesson=need-effect&topic=escape-hatches"

createServer({
    routes() {
        // namespace issue resolution taken from
        // https://github.com/miragejs/miragejs/issues/651#issuecomment-713283963
        this.namespace = "api"
        this.get("/search", (schema, request) => {
            // Leaving this here for reference
            // const queryObj = Object.fromEntries(new URLSearchParams(query))
            return fetchResults(
                request.queryParams.query,
                request.queryParams.page
            )
        })
        this.namespace = ""
        this.passthrough()
    },
})

export async function fetchResults(query, page) {
    console.debug(`fetchResults(): ${query}`)
    if (query === PARAMS_STRING) {
        return page
    } else {
        throw Error(`Unknown query: ${query}`)
    }
}
