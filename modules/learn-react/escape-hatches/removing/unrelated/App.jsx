import "./utilities"

import Combined from "./Combined"
import Separated from "./Separated"

import SublessonCard from "./SublessonCard"

export default function Unrelated() {
    return (
        <div className="flex flex-row h-full items-center">
            <div className="basis-1/2">
                <div className="flex items-center justify-center">
                    <SublessonCard title={"Combined"} Sublesson={Combined}>
                        This example combines both fetches within the same
                        useEffect().
                        <br />
                        When a city is changed, both the cities and areas are
                        fetched rather that just the areas.
                    </SublessonCard>
                </div>
            </div>
            <div className="basis-1/2">
                <div className="flex items-center justify-center">
                    <SublessonCard title={"Separated"} Sublesson={Separated}>
                        This example separates each fetch into their own
                        useEffect().
                        <br />
                        When a city is changed, only the areas are fetched.
                    </SublessonCard>
                </div>
            </div>
        </div>
    )
}
