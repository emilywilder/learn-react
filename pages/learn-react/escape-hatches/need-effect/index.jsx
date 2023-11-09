import { StrictMode, useState } from "react"

import '../../../../app/globals.css'

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

import Updating from './Updating'
import Sharing from './Sharing'

const sublessons = [
    {
        id: 0,
        title: "Updating state based on props or state",
        component: Updating
    },
    {
        id: 5,
        title: "Sharing logic between event handlers",
        component: Sharing

    }
]

function Blank() {
    return (
        <p>This app is yet to be defined.</p>
    )
}

function NavBar() {
    const [showMenu, setShowMenu] = useState(false)

    const listSublessons = (
        sublessons.map((sl) => (
            <li key={sl.id}><a>{sl.title}</a></li>
        ))
    )

    const handleClick = () => setShowMenu(!showMenu)
    
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost" onClick={handleClick}>
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
            {showMenu && 
                <ul className="menu bg-base-200 rounded-box">
                    {listSublessons}
                </ul>
            }
        </>
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