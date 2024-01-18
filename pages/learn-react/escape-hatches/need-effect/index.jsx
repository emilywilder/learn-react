import { StrictMode } from "react"

import "@/app/globals.css"
import LessonNavbar from "@/components/lessonNavbar"

import Updating from "./updating/App"
import Caching from "./caching/App"
import Resetting from "./resetting/App"
import Adjusting from "./adjusting/App"
import Sharing from "./sharing/App"
import Post from "./post/App"
import Chains from "./chains/App"
import Initializing from "./initializing/App"
import Notifying from "./notifying/App"
import Passing from "./passing/App"
import Subscribing from "./subscribing/App"

export default function Home() {
    return (
        <StrictMode>
            <LessonNavbar sublessons={sublessons} defaultSelectedId={10} />
        </StrictMode>
    )
}

const sublessons = [
    {
        id: 0,
        title: "Updating state based on props or state",
        component: Updating,
        usesTailwind: false,
    },
    {
        id: 1,
        title: "Caching expensive calculations",
        component: Caching,
        usesTailwind: false,
    },
    {
        id: 2,
        title: "Resetting all state when a prop changes",
        component: Resetting,
        usesTailwind: true,
    },
    {
        id: 3,
        title: "Adjusting some state when a prop changes",
        component: Adjusting,
        usesTailwind: true,
    },
    {
        id: 4,
        title: "Sharing logic between event handlers",
        component: Sharing,
        usesTailwind: true,
    },
    {
        id: 5,
        title: "Sending a POST request",
        component: Post,
        usesTailwind: true,
    },
    {
        id: 6,
        title: "Chains of computations",
        component: Chains,
        usesTailwind: true,
    },
    {
        id: 7,
        title: "Initializing the application",
        component: Initializing,
        usesTailwind: true,
    },
    {
        id: 8,
        title: "Notifying parent components about state changes",
        component: Notifying,
        usesTailwind: true,
    },
    {
        id: 9,
        title: "Passing data to the parent",
        component: Passing,
        usesTailwind: true,
    },
    {
        id: 10,
        title: "Subscribing to an external store",
        component: Subscribing,
        usesTailwind: true,
    },
    {
        id: 11,
        title: "Fetching data",
        component: null, // Fetching
        usesTailwind: true,
    },
]
