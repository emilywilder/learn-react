function Form() {
    const theme = useContext(ThemeContext)

    function handleSubmit() {
        // ✅ Good: Event-specific logic is called from event handlers
        post("/api/register")
        showNotification("Successfully registered!", theme)
    }

    // ...
}

// not in example
export default Form
