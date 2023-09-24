import React, { StrictMode } from "react";
import dynamic from "next/dynamic";
import "./styles.css";

// import App from './App'
// const App = dynamic(() => {
//       return import("./Challenge1");
//     },
//     { ssr: false }
//   )
import App from './Challenge2'

export default function Home() {
    return (
        <StrictMode>
            <App />
        </StrictMode>
    )
}