import RacyFetch from "./RacyFetch"
import CleanupFetch from "./CleanupFetch"
import HookFetch from "./HookFetch"

const paramsString =
    "sublesson=fetching&lesson=need-effect&topic=escape-hatches"

import { createServer } from "miragejs"

createServer({
    routes() {
        this.namespace = "api"
        this.get("/search", () => [{ id: "0", name: "api search" }])
        this.namespace = ""
        this.passthrough()
    },
})

export default function Fetching() {
    return (
        <>
            <RacyFetch query={paramsString} />
            <CleanupFetch query={paramsString} />
            <HookFetch query={paramsString} />
        </>
    )
}
