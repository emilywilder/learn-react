import { StrictMode } from "react"

import '@/app/globals.css'
import LessonNavbar from "@/components/lessonNavbar"

import Updating from './Updating'
import Sharing from './Sharing'

export default function Home() {
    return (
        <StrictMode>
            <LessonNavbar sublessons={sublessons} />
        </StrictMode>
    )
}

/* Pages and unique names
    Updating: Updating state based on props or state
    Caching: Caching expensive calculations
    Resetting: Resetting all state when a prop changes
    Adjusting: Adjusting some state when a prop changes
    Sharing: Sharing logic between event handlers
    Post: Sending a POST request
    Chains: Chains of computations
    Initializing: Initializing the application
    Notifying: Notifying parent components about state changes
    Passing: Passing data to the parent
    Subscribing: Subscribing to an external store
    Fetching: Fetching data
*/

const sublessons = [
    {
        id: 0,
        title: "Updating state based on props or state",
        component: Updating,
        usesTailwind: false
    },
    {
        id: 5,
        title: "Sharing logic between event handlers",
        component: Sharing,
        usesTailwind: true
    }
]