import Lesson from "@/components/Lesson"
import ReadingLesson from "@/components/ReadingLesson"

import ExtractingNonReactive from "./extractingNonReactive/App"
import Challenge1 from "./Challenge1/index"
import Challenge2 from "./Challenge2/index"
import Challenge3 from "./Challenge3/index"
import Challenge4 from "./Challenge4/index"

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
    {
        id: 5,
        title: "Challenge 1 of 4: Fix a variable that doesn’t update",
        component: Challenge1,
        usesTailwind: false,
        experimental: true,
    },
    {
        id: 6,
        title: "Challenge 2 of 4: Fix a freezing counter",
        component: Challenge2,
        usesTailwind: false,
        experimental: true,
    },
    {
        id: 7,
        title: "Challenge 3 of 4: Fix a non-adjustable delay",
        component: Challenge3,
        usesTailwind: false,
        experimental: true,
    },
    {
        id: 8,
        title: "Challenge 4 of 4: Fix a delayed notification",
        component: Challenge4,
        usesTailwind: false,
        experimental: true,
    },
]
