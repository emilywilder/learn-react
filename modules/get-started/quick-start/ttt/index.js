import React, { StrictMode } from "react";
import "./styles.css";

import Board from './app'

export default function Home() {
    return(
        <StrictMode>
            <Board/>
        </StrictMode>
    )
}