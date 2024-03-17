import { useRouter } from "next/router"

import HeroPage from "@/components/HeroPage"

export default function ReadingLesson({ url }) {
    const router = useRouter()

    function handleHomeClick() {
        router.push(url)
    }
    return (
        <HeroPage
            backgroundImage={"/images/jess-bailey-X5gDoysLbBc-unsplash.jpg"}
        >
            <HeroPage.Title>Hello!</HeroPage.Title>
            <HeroPage.Content>
                This is a reading lesson.
                <br />
                Please visit react.dev for this lesson&apos;s contents.
            </HeroPage.Content>
            <HeroPage.Actions>
                {url ? (
                    <button
                        className="btn btn-primary"
                        onClick={handleHomeClick}
                    >
                        Take me there
                    </button>
                ) : (
                    <button className="btn" disabled>
                        URL not specified
                    </button>
                )}
            </HeroPage.Actions>
        </HeroPage>
    )
}
