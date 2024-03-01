import { StrictMode } from "react"

// import "./styles.css"
// import "./Challenge1-styles.css"
// import "./Challenge2.css"
// import "./Challenge3-styles.css"
// import "./Challenge4-styles.css"
import "./Challenge5-styles.css"

// import App from './App'
// import App from './NestedDefinitionExample'
// import App from './Challenge2'
// import App from './Challenge3-App'
// import App from './Challenge4'
import App from './Challenge5-App'

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