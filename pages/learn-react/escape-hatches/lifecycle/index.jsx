import { StrictMode } from "react"

import "@/app/globals.css"
import LessonNavbar from "@/components/lessonNavbar"

export default function Home() {
    const mostRecentSublesson = sublessons
        .filter((x) => x.component)
        .reduce(
            (previous, current) =>
                current.id > previous.id ? current : previous,
            []
        )

    return (
        <StrictMode>
            <LessonNavbar
                lessonName="Lifecycle of Reactive Effects"
                sublessons={sublessons}
                defaultSelectedId={mostRecentSublesson.id}
            />
        </StrictMode>
    )
}

const sublessons = []
