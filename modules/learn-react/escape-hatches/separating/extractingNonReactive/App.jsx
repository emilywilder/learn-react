import "./notExtracted/styles.scss"
import "./extracted/styles.scss"

import { noTailwindClassName } from "@/components/LessonNavbar"

import NotExtracted from "./notExtracted/App"
import Extracted from "./extracted/App"

export default function ExtractingNonReactive() {
    return (
        <>
            <div
                className={`${noTailwindClassName} learn-react-escape-hatches-separating-extractingnonreactive-notextracted`}
            >
                <NotExtracted />
            </div>
            <div
                className={`${noTailwindClassName} learn-react-escape-hatches-separating-extractingnonreactive-extracted`}
            >
                <Extracted />
            </div>
        </>
    )
}
