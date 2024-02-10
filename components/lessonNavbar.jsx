import { useRouter } from "next/router"

import { useState } from "react"

import { HiOutlineHome } from "react-icons/hi2"
import { MdErrorOutline } from "react-icons/md"
import { RxHamburgerMenu } from "react-icons/rx"

import Blank from "@/components/blank"

export default function LessonNavbar({ sublessons, defaultSelectedId = 0 }) {
    const router = useRouter()

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

    function handleHomeClick() {
        router.push("/")
    }

    const listSublessons = sublessons.map((sl) => (
        <li key={sl.id}>
            <a
                className={sl.id === selectedSublessonId ? "active" : undefined}
                onClick={() => handleMenuClick(sl.id)}
            >
                {sl.title}{" "}
                <p className="flex justify-end">
                    {!sl.component ? <MdErrorOutline /> : undefined}
                </p>
            </a>
        </li>
    ))

    return (
        <>
            <div className="navbar bg-base-100 space-x-0">
                <div className="flex-1 breadcrumbs">
                    <ul>
                        <li>
                            <button
                                className="btn btn-ghost btn-square"
                                onClick={() => handleHomeClick()}
                            >
                                <HiOutlineHome className="h-5 w-5" />
                            </button>
                        </li>
                        <li className="normal-case text-xl">
                            You Might Not Need an Effect
                        </li>
                        <li>{selectedSublesson.title}</li>
                    </ul>
                </div>
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
            </div>
            {/* disable tailwind for components made before its inclusion
                and set a default margain as the content is too left adjusted
                when tailwind is not used. */}
            <div
                className={
                    !selectedSublesson.usesTailwind
                        ? "notailwind ml-4"
                        : undefined
                }
            >
                {selectedSublesson.component ? (
                    <selectedSublesson.component />
                ) : (
                    <Blank />
                )}
            </div>
        </>
    )
}
