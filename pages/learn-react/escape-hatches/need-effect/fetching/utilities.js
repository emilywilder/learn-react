import { createServer } from "miragejs"

export const PARAMS_STRING =
    "sublesson=fetching&lesson=need-effect&topic=escape-hatches"

const PAGE_SIZE = 4

const BOOK_CATALOGUE = [
    { id: 1, title: "First Book", author: "One Oneington" },
    { id: 2, title: "Second Book", author: "Two Twostone" },
    { id: 3, title: "Third Book", author: "Three Threeple" },
    { id: 4, title: "Fourth Book", author: "Four Fourier" },
    { id: 5, title: "Fifth Book", author: "Five Fivety" },
    { id: 6, title: "Sixth Book", author: "Six Sixton" },
    { id: 7, title: "Seventh Book", author: "Seven Seveneth" },
    { id: 8, title: "Eighth Book", author: "Eight Eightington" },
    { id: 9, title: "Nineth Book", author: "Nine Niner" },
    { id: 10, title: "Tenth Book", author: "Ten Tenston" },
    { id: 11, title: "Eleventh Book", author: "Eleven Elevenanth" },
    { id: 12, title: "Twelveth Book", author: "Twelve Twelveischer" },
]

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
        return BOOK_CATALOGUE.slice(0, PAGE_SIZE)
    } else {
        throw Error(`Unknown query: ${query}`)
    }
}
