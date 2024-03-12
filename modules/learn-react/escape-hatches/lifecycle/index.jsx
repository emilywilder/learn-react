import Lesson from "@/components/Lesson"
import ReadingLesson from "@/components/ReadingLesson"

import EffectLifecycle from "./effectLifecycle/App"
import SyncFrequency from "./syncFrequency/App"
import HowResync from "./howResync/App"
import VerifyResync from "./verifyResync/App"
import SyncProcess from "./syncProcess/App"
import ReactiveValues from "./reactiveValues/index"
import EmptyDeps from "./emptyDeps/index"

export default function Home() {
    return (
        <Lesson name="Lifecycle of Reactive Effects" sublessons={sublessons} />
    )
}

const sublessons = [
    {
        id: 0,
        title: "The lifecycle of an Effect",
        component: EffectLifecycle,
    },
    {
        id: 1,
        title: "Why synchronization may need to happen more than once",
        component: SyncFrequency,
    },
    {
        id: 2,
        title: "How React re-synchronizes your Effect",
        component: HowResync,
    },
    {
        id: 3,
        title: "Thinking from the Effect\u2019s perspective",
        component: ReadingLesson,
        url: "https://react.dev/learn/lifecycle-of-reactive-effects#thinking-from-the-effects-perspective",
    },
    {
        id: 4,
        title: "How React verifies that your Effect can re-synchronize",
        component: VerifyResync,
        usesTailwind: false,
    },
    {
        id: 5,
        title: "How React knows that it needs to re-synchronize the Effect",
        component: ReadingLesson,
        url: "https://react.dev/learn/lifecycle-of-reactive-effects#how-react-knows-that-it-needs-to-re-synchronize-the-effect",
    },
    {
        id: 6,
        title: "Each Effect represents a separate synchronization process",
        component: SyncProcess,
    },
    {
        id: 7,
        title: "Effects “react” to reactive values",
        component: ReactiveValues,
        usesTailwind: false,
    },
    {
        id: 8,
        title: "What an Effect with empty dependencies means",
        component: EmptyDeps,
        usesTailwind: false,
    },
    {
        id: 9,
        title: "All variables declared in the component body are reactive",
        component: null, // ReactiveVars
    },
    {
        id: 10,
        title: "React verifies that you specified every reactive value as a dependency",
        component: null, // VerifyReactiveDeps
    },
    {
        id: 11,
        title: "What to do when you don\u2019t want to re-synchronize",
        component: null, // NoResync
    },
    {
        id: 12,
        title: "Challenge 1: Fix reconnecting on every keystroke",
        component: null, // Challenge1
    },
    {
        id: 13,
        title: "Challenge 2: Switch synchronization on and off",
        component: null, // Challenge2
    },
    {
        id: 14,
        title: "Challenge 3: Investigate a stale value bug",
        component: null, // Challenge3
    },
    {
        id: 15,
        title: "Challenge 4: Fix a connection switch",
        component: null, // Challenge4
    },
    {
        id: 16,
        title: "Challenge 5: Populate a chain of select boxes",
        component: null, // Challenge5
    },
]
