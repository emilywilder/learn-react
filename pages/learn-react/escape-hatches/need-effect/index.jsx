import { StrictMode } from "react"

import '../../../../app/globals.css'

import Sharing from './Sharing'

function Blank() {
    return (
        <p>This app is yet to be defined.</p>
    )
}

function NavBar() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
            <div className="flex-1 breadcrumbs ml-2">
                <ul>
                    <li className="normal-case text-xl">You Might Not Need an Effect</li>
                    <li>Sharing logic between event handlers</li>
                </ul>
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <StrictMode>
            <NavBar />
            <Sharing />
        </StrictMode>
    )
}