import { useRouter } from "next/router"

import { useState } from "react"

import { HiOutlineHome } from "react-icons/hi2"
import { MdErrorOutline } from "react-icons/md"
import { RxHamburgerMenu } from "react-icons/rx"
import { LuBook } from "react-icons/lu"
import { AiOutlineExperiment } from "react-icons/ai"

import Blank from "@/components/Blank"
import ReadingLesson from "./ReadingLesson"
import Experimental from "./Experimental"

export const noTailwindClassName = "notailwind ml-4"

export default function LessonNavbar({
    lessonName,
    sublessons,
    defaultSelectedId = 0,
}) {
    const [selectedSublessonId, setSelectedSublessonId] =
        useState(defaultSelectedId)

    const selectedSublesson = sublessons.find(
        (sl) => sl.id === selectedSublessonId
    )

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

    return (
        <>
            <div className="navbar bg-base-100 space-x-0">
                <div className="flex-1 breadcrumbs">
                    <ul>
                        <li>
                            <HomeButton />
                        </li>
                        <li className="normal-case text-xl">{lessonName}</li>
                        {selectedSublesson && (
                            <li>{selectedSublesson.title}</li>
                        )}
                    </ul>
                </div>
                <SublessonMenu
                    sublessons={sublessons}
                    selectedSublessonId={selectedSublessonId}
                    onMenuClick={handleMenuClick}
                />
            </div>
            <Sublesson sublesson={selectedSublesson} />
        </>
    )
}

function HomeButton() {
    const router = useRouter()

    function handleHomeClick() {
        router.push("/")
    }

    return (
        <button
            className="btn btn-ghost btn-square"
            onClick={() => handleHomeClick()}
        >
            <HiOutlineHome className="h-5 w-5" />
        </button>
    )
}

function SublessonMenu({ sublessons, selectedSublessonId, onMenuClick }) {
    const listSublessons = sublessons.map((sl) => (
        <li key={sl.id}>
            <a
                className={sl.id === selectedSublessonId ? "active" : undefined}
                onClick={() => onMenuClick(sl.id)}
            >
                {sl.title}{" "}
                <p className="flex justify-end">
                    {!sl.component ? <MdErrorOutline /> : undefined}
                    {sl.component === ReadingLesson ? <LuBook /> : undefined}
                    {sl.experimental ? <AiOutlineExperiment /> : undefined}
                </p>
            </a>
        </li>
    ))

    return (
        <>
            {Array.isArray(sublessons) && sublessons.length > 0 ? (
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn m-1 btn-ghost">
                            <RxHamburgerMenu className="h-5 w-5" />
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-96"
                        >
                            {listSublessons}
                        </ul>
                    </div>
                </div>
            ) : null}
        </>
    )
}

function Sublesson({ sublesson }) {
    /*
        disable tailwind for components made before its inclusion
        and set a default margain as the content is too left adjusted
        when tailwind is not used.
    */

    function getComponent(sublesson) {
        if ("experimental" in sublesson && sublesson.experimental) {
            return <Experimental />
        } else if ("component" in sublesson && sublesson.component) {
            if (sublesson.component === ReadingLesson) {
                return "url" in sublesson ? (
                    <ReadingLesson url={sublesson.url} />
                ) : (
                    <ReadingLesson />
                )
            } else {
                return <sublesson.component />
            }
        } else {
            return <Blank />
        }
    }

    const className =
        "usesTailwind" in sublesson && !sublesson.usesTailwind
            ? noTailwindClassName
            : undefined

    return <div className={className}>{getComponent(sublesson)}</div>
}
