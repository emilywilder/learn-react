import { StrictMode } from "react"

import "@/app/globals.css"
import LessonNavbar from "@/components/LessonNavbar"

export default function Lesson({ name, sublessons }) {
    const mostRecentSublesson = sublessons
        .filter((x) => x.component)
        .reduce(
            (previous, current) =>
                current.id > previous.id ? current : previous,
            { id: 0 }
        )

    return (
        <StrictMode>
            <LessonNavbar
                lessonName={name}
                sublessons={sublessons}
                defaultSelectedId={mostRecentSublesson.id}
            />
        </StrictMode>
    )
}
