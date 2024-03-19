import Lesson from "@/components/Lesson"
import ReadingLesson from "@/components/ReadingLesson"

import MoveToEvent from "./moveToEvent/App"

export default function Home() {
    return (
        <Lesson name="Removing Effect Dependencies" sublessons={sublessons} />
    )
}

const sublessons = [
    {
        id: 0,
        title: "Dependencies should match the code",
        component: ReadingLesson,
        url: "https://react.dev/learn/removing-effect-dependencies#dependencies-should-match-the-code",
    },
    {
        id: 1,
        title: "Should this code move to an event handler?",
        component: MoveToEvent,
    },
]

// Unrelated: Is your Effect doing several unrelated things?
// Calculate: Are you reading some state to calculate the next state?
// NotReacting: Do you want to read a value without “reacting” to its changes?
// Unintended: Does some reactive value change unintentionally?
