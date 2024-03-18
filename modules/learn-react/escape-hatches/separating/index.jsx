import Lesson from "@/components/Lesson"
import ReadingLesson from "@/components/ReadingLesson"

import ExtractingNonReactive from "./extractingNonReactive/App"
import { title } from "process"

export default function Home() {
    return (
        <Lesson name="Separating Events from Effects" sublessons={sublessons} />
    )
}

const sublessons = [
    {
        id: 0,
        title: "Choosing between event handlers and Effects",
        component: ReadingLesson,
        url: "https://react.dev/learn/separating-events-from-effects#choosing-between-event-handlers-and-effects",
    },
    {
        id: 1,
        title: "Reactive values and reactive logic",
        component: ReadingLesson,
        url: "https://react.dev/learn/separating-events-from-effects#reactive-values-and-reactive-logic",
    },
    {
        id: 2,
        title: "Extracting non-reactive logic out of Effects",
        component: ExtractingNonReactive,
        experimental: true,
    },
    {
        id: 3,
        title: "Reading latest props and state with Effect Events",
        component: ReadingLesson,
        url: "https://react.dev/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events",
    },
    {
        id: 4,
        title: "Limitations of Effect Events",
        component: ReadingLesson,
        url: "https://react.dev/learn/separating-events-from-effects#limitations-of-effect-events",
    },
]
