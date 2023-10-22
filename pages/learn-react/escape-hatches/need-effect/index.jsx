import { StrictMode } from "react"

import '../../../../app/globals.css'
// import "./styles.css"

import App from './App'

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