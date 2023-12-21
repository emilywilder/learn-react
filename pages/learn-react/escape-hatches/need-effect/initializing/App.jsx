import { useEffect, useState } from "react";

let didInit = false

function loadDataFromLocalStorage() {
    console.log('loading data from storage')
}

function checkAuthToken() {
    console.log('checking auth token')
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



function ModuleApp() {
    const [loadUseEffectApp, setLoadUseEffectApp] = useState(false)
    const [loadGobalVarApp, setLoadGlobalVarApp] = useState(false)

    return (
        <div>
            <LoadUnloadApp stateVar={loadUseEffectApp} setStateVar={setLoadUseEffectApp} App={UseEffectApp} />
            <LoadUnloadApp stateVar={loadGobalVarApp} setStateVar={setLoadGlobalVarApp} App={GlobalVarApp} />
        </div>
    )
}

if (typeof window !== 'undefined') { // Check if we're running in the browser.
    // ✅ Only runs once per app load
   checkAuthToken()
   loadDataFromLocalStorage()
}

function LoadUnloadApp({ stateVar, setStateVar, App }) {
    return (
        <div className="m-4">
            <button className="btn" onClick={() => setStateVar(!stateVar)}>
                {stateVar ? "Unload" : "Load"} {App.name}
            </button>
            {stateVar && <App /> }
        </div>
    )
}

export default function App() {
    const [loadModuleApp, setLoadModuleApp] = useState(false)

    return (
        <div>
            <LoadUnloadApp stateVar={loadModuleApp} setStateVar={setLoadModuleApp} App={ModuleApp} />
        </div>
    )
}