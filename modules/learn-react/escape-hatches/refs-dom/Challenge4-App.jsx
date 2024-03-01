import { useRef } from "react";
import SearchButton from "./Challenge4-SearchButton";
import SearchInput from "./Challenge4-SearchInput";

export default function Page() {
    const inputRef = useRef(null)

    function handleClick() {
        inputRef.current.focus()
    }

    return (
        <>
            <nav>
                <SearchButton onClick={handleClick} />
            </nav>
            <SearchInput ref={inputRef}/>
        </>
    )
}