import { Profiler, useState } from "react"

export default function ProfileComponent({ name, Component, props }) {
    const [time, setTime] = useState(0)

    function handleRender(id, phase, actualDuration) {
        console.log(
            `⏰ The ${id} interaction took ` +
            `${actualDuration}ms to render (${phase})`
        )
        setTime(time + actualDuration)
    }
    return (
        <>
            <h3>{name}:</h3>
            <Profiler id={name} onRender={handleRender}>
                <Component {...props} />
            </Profiler>
            <p><i>Total render time: {time}ms</i></p>
        </>
    )
}