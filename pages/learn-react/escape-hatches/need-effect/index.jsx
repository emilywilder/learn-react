import { StrictMode } from "react"

import '@/app/globals.css'
import LessonNavbar from "@/components/lessonNavbar"

import Updating from './updating/App'
import Sharing from './sharing/App'
import Caching from './caching/App'

export default function Home() {
    return (
        <StrictMode>
            <LessonNavbar sublessons={sublessons} defaultSelectedId={4} />
        </StrictMode>
    )
}

const sublessons = [
    {
        id: 0,
        title: "Updating state based on props or state",
        component: Updating,
        usesTailwind: false
    },
    {
        id: 1,
        title: "Caching expensive calculations",
        component: Caching,
        usesTailwind: false
    },
    {
        id: 2,
        title: "Resetting all state when a prop changes",
        component: null, // Resetting
        usesTailwind: false
    },
    {
        id: 3,
        title: "Adjusting some state when a prop changes",
        component: null, // Adjusting
        usesTailwind: false
    },
    {
        id: 4,
        title: "Sharing logic between event handlers",
        component: Sharing,
        usesTailwind: true
    },
    {
        id: 5,
        title: "Sending a POST request",
        component: null, // Post
        usesTailwind: true
    },
    {
        id: 6,
        title: "Chains of computations",
        component: null, // Chains
        usesTailwind: true
    },
    {
        id: 7,
        title: "Initializing the application",
        component: null, // Initializing
        usesTailwind: true
    }, 
    {
        id: 8,
        title: "Notifying parent components about state changes",
        component: null, // Notifying
        usesTailwind: true
    },
    {
        id: 9,
        title: "Passing data to the parent",
        component: null, // Passing
        usesTailwind: true
    },
    {
        id: 10,
        title: "Subscribing to an external store",
        component: null, // Subscribing
        usesTailwind: true
    }, 
    {
        id: 11,
        title: "Fetching data",
        component: null, // Fetching
        usesTailwind: true
    },
]