import RacyFetch from "./RacyFetch"
import CleanupFetch from "./CleanupFetch"
import HookFetch from "./HookFetch"

const paramsString =
    "sublesson=fetching&lesson=need-effect&topic=escape-hatches"

export default function Fetching() {
    return (
        <>
            <RacyFetch query={paramsString} />
            <CleanupFetch query={paramsString} />
            <HookFetch query={paramsString} />
        </>
    )
}
