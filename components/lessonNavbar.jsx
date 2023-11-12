import { useState } from "react"

export default function LessonNavbar({ sublessons, defaultSelectedId=0 }) {
    const [selectedSublessonId, setSelectedSublessonId] = useState(defaultSelectedId)

    const selectedSublesson = sublessons.find((sl) => sl.id === selectedSublessonId)

    const loseFocus = () => {
        const elem = document.activeElement
        if (elem) {
            elem.blur()
        }
    }
    
    function handleMenuClick(id) {
        setSelectedSublessonId(id)
        /* daisyUI uses css focus to open and close the menu
          purposely lose focus when clicked to close the menu */
        loseFocus()
    }

    const listSublessons = (
        sublessons.map((sl) => (
            <li key={sl.id}>
                <a className={sl.id === selectedSublessonId ? 'active' : undefined}
                    onClick={() => handleMenuClick(sl.id)}>{sl.title}
                </a>
            </li>
        ))
    )
    
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-none">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn m-1 btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-96">
                            {listSublessons}
                        </ul>
                    </div>
                </div>
                <div className="flex-1 breadcrumbs ml-2">
                    <ul>
                        <li className="normal-case text-xl">You Might Not Need an Effect</li>
                        <li>{selectedSublesson.title}</li>
                    </ul>
                </div>
            </div>
            {/* disable tailwind for components made before its inclusion
                and set a default margain as the content is too left adjusted
                when tailwind is not used. */}
            <div className={!selectedSublesson.usesTailwind ? 'notailwind ml-4' : undefined}>
                <selectedSublesson.component />
            </div>
        </>
    )
}