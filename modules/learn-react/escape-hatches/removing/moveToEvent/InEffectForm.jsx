import { useContext, useEffect, useState } from "react"
import FormRender, { showNotification, post, ThemeContext } from "./Form"

function Form() {
    const [submitted, setSubmitted] = useState(false)
    const theme = useContext(ThemeContext)

    useEffect(() => {
        if (submitted) {
            // 🔴 Avoid: Event-specific logic inside an Effect
            post("/api/register")
            showNotification("Successfully registered!", theme)
        }
    }, [submitted, theme]) // ✅ All dependencies declared

    function handleSubmit() {
        setSubmitted(true)
    }

    // ...
    return <FormRender onSubmit={handleSubmit} />
}

// not in example
export default Form
