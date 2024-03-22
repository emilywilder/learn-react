import Combined from "./Combined"
import Separated from "./Separated"

export default function Unrelated() {
    return (
        <div className="h-full">
            <div>
                <Combined />
                <Separated />
            </div>
        </div>
    )
}
