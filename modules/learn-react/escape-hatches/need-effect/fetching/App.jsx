import BookSearch from "./BookSearch"
import RacySearchResults from "./RacySearchResults"
import CleanupSearchResults from "./CleanupSearchResults"
import HookSearchResults from "./HookSearchResults"

function RacyBookSearch() {
    return (
        <BookSearch SearchResultsComponent={RacySearchResults}>
            <h1 className="card-title">Racy BookSearch</h1>
            <p>
                This search method sends a fetch for each change in the search
                text area. Since each letter typed will spawn a new fetch, and
                each fetch will take a variable amount of time to complete, this
                method contains a race-condition whereby the results may not
                render in order of submission.
            </p>
        </BookSearch>
    )
}

function CleanupBookSearch() {
    return (
        <BookSearch SearchResultsComponent={CleanupSearchResults}>
            <h1 className="card-title">BookSearch with Cleanup</h1>
            <p>
                This search method avoids a race condition by utilizing a
                cleanup function to ignore all but the last query.
            </p>
        </BookSearch>
    )
}

function HookBookSearch() {
    return (
        <BookSearch SearchResultsComponent={HookSearchResults}>
            <h1 className="card-title">BookSearch with Custom Hook</h1>
            <p>
                This search method uses a custom hook to control fetching and
                cleaning up old fetch requests, more similarly to a use hook
                implemented by modern frameworks.
            </p>
        </BookSearch>
    )
}

export default function Fetching() {
    return (
        <div className="flex flex-col items-center">
            <RacyBookSearch />
            <CleanupBookSearch />
            <HookBookSearch />
        </div>
    )
}
