import { createServer } from "miragejs"
import BOOK_CATALOGUE from "./books.json"

const PAGE_SIZE = 4

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

export function getNumPages(recordCount) {
    console.debug(`getNumPages::recordCount = ${recordCount}`)
    return Math.ceil(recordCount / PAGE_SIZE)
}

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

function intersection(a, b) {
    return new Set([...a].filter((x) => b.has(x)))
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchResults(query, page) {
    console.debug(`fetchResults(): ${query}`)
    const params = new URLSearchParams(query)
    // BOOK_CATALOGUE isn't avaliable in the debugger unless defined locally
    const bookCatalogue = BOOK_CATALOGUE
    const paramsKeys = Array.from(params.keys())
    const bookshelf = paramsKeys
        // has a value
        .filter((key) => params.get(key))
        // map into a list of books that match this particular query term
        .map((key) =>
            bookCatalogue.filter((b) =>
                b[key].toUpperCase().includes(params.get(key).toUpperCase())
            )
        )
    // reduce into a unique list of books that match all query terms
    const books =
        // if the bookshelf is empty, there's nothing to reduce
        bookshelf.length > 0
            ? bookshelf.reduce((result, value) =>
                  intersection(new Set(result), new Set(value))
              )
            : []
    const pages = getNumPages(books.length)
    const pagedBooks = Array.from(books).slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    )
    await delay(Math.floor(Math.random() * 2000))
    return { pages: pages, books: pagedBooks }
}
