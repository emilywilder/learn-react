import { useRouter } from "next/router"

export default function ReadingLesson({ url }) {
    const router = useRouter()

    function handleHomeClick() {
        router.push(url)
    }
    return (
        <div
            className="hero h-[calc(100vh-5em)]"
            style={{
                backgroundImage:
                    "url(/images/jess-bailey-X5gDoysLbBc-unsplash.jpg)",
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello!</h1>
                    <p className="mb-5">
                        This is a reading lesson.
                        <br />
                        Please visit react.dev for this lesson&apos;s contents.
                    </p>

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
                </div>
            </div>
        </div>
    )
}
