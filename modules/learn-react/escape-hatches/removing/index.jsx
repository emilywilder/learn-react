import Lesson from "@/components/Lesson"
import ReadingLesson from "@/components/ReadingLesson"

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
]
