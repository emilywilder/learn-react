import BookSearch from "./BookSearch"
import RacySearchResults from "./RacySearchResults"
import CleanupSearchResults from "./CleanupSearchResults"
import HookSearchResults from "./HookSearchResults"

export default function Fetching() {
    return (
        <div className="flex flex-col items-center">
            <BookSearch name={"RacySearch"} SearchResults={RacySearchResults} />
            <BookSearch
                name={"CleanupSearch"}
                SearchResults={CleanupSearchResults}
            />
            <BookSearch name={"HookSearch"} SearchResults={HookSearchResults} />
        </div>
    )
}
