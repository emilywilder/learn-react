import "./utilities"

import Combined from "./Combined"
import Separated from "./Separated"

import SublessonCard from "./SublessonCard"

export default function Unrelated() {
    return (
        <div className="flex flex-row h-full items-center justify-evenly">
            <SublessonCard title={"Combined"} Sublesson={Combined}>
                This example combines both fetches within the same useEffect().
            </SublessonCard>
            <SublessonCard title={"Separated"} Sublesson={Separated}>
                This example separates each fetch into their own useEffect().
            </SublessonCard>
        </div>
    )
}
