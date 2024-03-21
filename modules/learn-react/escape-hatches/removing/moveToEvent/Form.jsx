import { createContext } from "react"
import toast, { Toaster } from "react-hot-toast"

export const ThemeContext = createContext()

export function showNotification(message, theme) {
    const toastClassName =
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
    toast.custom((t) => (
        <div
            className={`px-6 py-4 shadow-md rounded-full ${toastClassName} ${
                t.visible ? "animate-enter" : "animate-leave"
            }`}
        >
            {message}
        </div>
    ))
}
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
            <Toaster
                toastOptions={{ position: "top-right" }}
                containerStyle={{ top: 120 }}
            />
        </form>
    )
}
