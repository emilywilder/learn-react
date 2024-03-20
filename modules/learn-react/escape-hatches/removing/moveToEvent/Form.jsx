import { createContext } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
            <ToastContainer />
        </form>
    )
}
