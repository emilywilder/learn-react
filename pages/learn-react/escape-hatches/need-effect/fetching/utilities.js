import { createServer } from "miragejs"

createServer({
    routes() {
        // namespace issue resolution taken from
        // https://github.com/miragejs/miragejs/issues/651#issuecomment-713283963
        this.namespace = "api"
        this.get("/search", (schema, request) => {
            const page = request.queryParams.page
            const query = request.queryParams.query
            const queryObj = Object.fromEntries(new URLSearchParams(query))
            return queryObj
        })
        this.namespace = ""
        this.passthrough()
    },
})

export async function fetchResults(query, page) {
    const params = new URLSearchParams({ query, page })
    console.log(params)
}
