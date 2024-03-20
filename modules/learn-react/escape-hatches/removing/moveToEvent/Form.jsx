import { createContext } from "react"
import toast, { Toaster } from "react-hot-toast"

export const ThemeContext = createContext()

export const showNotification = (message, theme) =>
    toast(message, { theme: theme })
export const post = (x) => console.log(x)

export default function FormRender({ onSubmit }) {
    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(e)
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            <Toaster />
        </form>
    )
}
