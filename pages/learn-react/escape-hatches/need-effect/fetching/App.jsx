import RacyFetch from "./RacyFetch"
import CleanupFetch from "./CleanupFetch"
import HookFetch from "./HookFetch"

const paramsString = "q=fetching&topic=learnreact"

export default function Fetching() {
    return (
        <>
            <RacyFetch query={paramsString} />
            <CleanupFetch query={paramsString} />
            <HookFetch query={paramsString} />
        </>
    )
}
