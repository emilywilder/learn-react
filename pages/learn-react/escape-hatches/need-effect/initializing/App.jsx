import { useEffect, useState } from "react";
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

let didInit = false

function toast(message) {
    Toastify({
        text: message,
        duration: 2000,
        gravity: 'top',
        position: 'right',
        offset: {
            y: 90
        }
    }).showToast()
}

function loadDataFromLocalStorage() {
    toast('Loading data from storage')
}

function checkAuthToken() {
    toast('Checking auth token')
}

function UseEffectApp() {
    // 🔴 Avoid: Effects with logic that should only ever run once
    useEffect(() => {
        loadDataFromLocalStorage()
        checkAuthToken()
    }, [])
    // ...
}

function GlobalVarApp() {
    useEffect(() => {
        if (!didInit) {
            didInit = true
            // ✅ Only runs once per app load
            loadDataFromLocalStorage()
            checkAuthToken()
        }
    }, [])
    // ...
}

if (typeof window !== 'undefined') { // Check if we're running in the browser.
    // ✅ Only runs once per app load
   checkAuthToken()
   loadDataFromLocalStorage()
}

function LoadUnloadApp({ stateVar, setStateVar, App, label="" }) {
    return (
        <div className="m-4">
            <button className="btn" onClick={() => setStateVar(!stateVar)}>
                {stateVar ? "Unload" : "Load"} {label ? label : App.name}
            </button>
            {stateVar && <App /> }
        </div>
    )
}

export default function App() {
    const [loadUseEffectApp, setLoadUseEffectApp] = useState(false)
    const [loadGobalVarApp, setLoadGlobalVarApp] = useState(false)

    return (
        <div className="m-10 w-1/2 space-y-6">
            <div className="text-lg font-bold text-blue-500">Demonstrate implementation differences in running initialization functions.</div>
            <p>
                On page load the initialization functions run one time, prior to react component mounting.
            </p>
            <p>
                This component runs the functions in a useEffect() call. Since useEffect() is run
                on mount, the functions inside are called every time the component is loaded.
            </p>
            <LoadUnloadApp stateVar={loadUseEffectApp} setStateVar={setLoadUseEffectApp}
                App={UseEffectApp} label="useEffect in component"
            />
            <div>
                This component also runs the functions in a useEffect() call, but utilizes a global variable
                to keep track of whether the function has already been run. This results in the functions
                being run only once.
            </div>
            <LoadUnloadApp stateVar={loadGobalVarApp} setStateVar={setLoadGlobalVarApp}
                App={GlobalVarApp} label="useEffect with global variable"
            />
        </div>
    )
}