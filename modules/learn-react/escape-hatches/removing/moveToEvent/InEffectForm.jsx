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
}

// not in example
export default Form
