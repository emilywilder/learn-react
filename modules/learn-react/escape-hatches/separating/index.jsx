import Lesson from "@/components/Lesson"
import ReadingLesson from "@/components/ReadingLesson"

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
]
