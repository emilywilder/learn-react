import { useContext } from "react"
import FormRender, { post, showNotification, ThemeContext } from "./Form"

function Form() {
    const theme = useContext(ThemeContext)

    function handleSubmit() {
        // ✅ Good: Event-specific logic is called from event handlers
        post("/api/register")
        showNotification("Successfully registered!", theme)
    }

    // ...

    return <FormRender onSubmit={handleSubmit} />
}

// not in example
export default Form
