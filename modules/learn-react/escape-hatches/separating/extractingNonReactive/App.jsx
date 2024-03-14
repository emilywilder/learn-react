import "./notExtracted/styles.scss"
import "./extracted/styles.scss"

import { noTailwindClassName } from "@/components/LessonNavbar"

import NotExtracted from "./notExtracted/App"
import Extracted from "./extracted/App"

export default function ExtractingNonReactive() {
    return (
        <>
            <div className="flex flex-col space-y-4 p-4 pt-20 bg-base-200 h-dvh">
                <div className="card bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title">Not Extracted Example</h2>
                        <p>
                            When you change the theme settings, this
                            implementation triggers a reconnection to the
                            chatroom.
                        </p>
                        <div
                            className={`${noTailwindClassName} learn-react-escape-hatches-separating-extractingnonreactive-notextracted`}
                        >
                            <NotExtracted />
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title">Extracted Example</h2>
                        <p>
                            By extracting the reconnection event from the
                            effect, the reconnection only occurs when the chat
                            room has been changed.
                        </p>
                        <div
                            className={`${noTailwindClassName} learn-react-escape-hatches-separating-extractingnonreactive-extracted`}
                        >
                            <Extracted />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
