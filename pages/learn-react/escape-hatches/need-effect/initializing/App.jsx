import { useEffect } from "react";

let didInit = false

function loadDataFromLocalStorage() {
    console.log('loading data from storage')
}

function checkAuthToken() {
    console.log('checking auth token')
}

function UseEffectApp() {
    console.log(`${UseEffectApp.name} init`)
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

function ModuleApp() {
}

export default function App() {
    return (
        <>
            <UseEffectApp />
            <GlobalVarApp />
            <ModuleApp />
        </>
    )
}