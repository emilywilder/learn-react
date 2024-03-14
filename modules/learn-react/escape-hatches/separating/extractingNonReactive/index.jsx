import "./notExtracted/styles.scss"

import { noTailwindClassName } from "@/components/LessonNavbar"

import NotExtracted from "./notExtracted/App"

export default function Index() {
    return (
        <div
            className={`${noTailwindClassName} learn-react-escape-hatches-separating-extractingnonreactive`}
        >
            <NotExtracted />
        </div>
    )
}
