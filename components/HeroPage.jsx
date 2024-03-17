export default function HeroPage({ backgroundImage, children }) {
    return (
        <div
            className="hero h-[calc(100vh-5em)]"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">{children}</div>
            </div>
        </div>
    )
}

HeroPage.Title = function HeroTitle({ children }) {
    return (
        <h1 className="mb-5 text-5xl font-bold flex justify-center">
            {children}
        </h1>
    )
}

HeroPage.Content = function HeroContent({ children }) {
    return <div className="mb-5 flex flex-col items-center">{children}</div>
}

HeroPage.Actions = function HeroActions({ children }) {
    return <div>{children}</div>
}
