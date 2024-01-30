import RacyFetch from "./RacyFetch"
import CleanupFetch from "./CleanupFetch"
import HookFetch from "./HookFetch"
import { PARAMS_STRING } from "./utilities"

export default function Fetching() {
    return (
        <div className="flex flex-col items-center">
            <RacyFetch query={PARAMS_STRING} />
            <CleanupFetch query={PARAMS_STRING} />
            <HookFetch query={PARAMS_STRING} />
        </div>
    )
}
