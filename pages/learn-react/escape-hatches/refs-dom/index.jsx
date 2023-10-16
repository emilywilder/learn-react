import { StrictMode } from "react"

// import "./styles.css"
import "./Challenge1-styles.css"

// import App from './App'
import App from './Challenge1-App'

function Blank() {
    return (
        <p>This app is yet to be defined.</p>
    )
}

export default function Home() {
    return (
        <StrictMode>
            <App />
        </StrictMode>
    )
}