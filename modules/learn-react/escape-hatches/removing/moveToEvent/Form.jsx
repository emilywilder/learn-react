import { createContext } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const ThemeContext = createContext()

export const showNotification = (message, theme) => toast(message)
export const post = (x) => console.log(x)

export default function FormRender({ onSubmit }) {
    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(e)
    }

    return (
        <div className="card shadow-xl bg-base-100 w-72 h-40">
            <ToastContainer />
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="card-actions">
                        <button type="submit" className="btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
