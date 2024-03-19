import Lesson from "@/components/Lesson"
import ReadingLesson from "@/components/ReadingLesson"

export default function Home() {
    return (
        <Lesson
            name="Reusing Logic with Custom Hooks"
            sublessons={sublessons}
        />
    )
}

const sublessons = []
