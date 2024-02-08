import { useState, Fragment } from "react"
import { capitalize } from "./utilities"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"

export default function BookSearch({ name, SearchResults }) {
    const searchByOptions = [
        { id: 0, name: "Author", token: "author" },
        { id: 1, name: "Title", token: "title" },
    ]
    const [searchText, setSearchText] = useState("")
    const [searchBy, setSearchBy] = useState(
        searchByOptions.find((x) => x.token === "author")
    )

    function handleChange(e) {
        setSearchText(e.target.value)
    }

    return (
        <div className="card shadow-xl w-3/4  m-4 p-4">
            <div className="card-body w-full">
                <h1 className="card-title">{name}</h1>
                <div className="label flex">
                    <span className="label-text">Search for a book by</span>
                    <SearchOptionsPicker
                        options={searchByOptions}
                        selectedOption={searchBy}
                        onChange={setSearchBy}
                    />
                </div>
                <label className="form-control w-full">
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                    />
                </label>
                <SearchResults query={`${searchBy.token}=${searchText}`} />
            </div>
        </div>
    )
}

function SearchOptionsPicker({ options, selectedOption, onChange }) {
    return (
        <Listbox value={selectedOption} by="id" onChange={onChange}>
            <div className="relative w-40">
                <Listbox.Button className="relative shadow-md rounded-lg py-2 pl-3 pr-10 w-full text-left">
                    <span>{selectedOption.name}</span>
                    <span className="absolute flex items-center inset-y-0 right-0 pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute rounded shadow-lg w-full mt-1 py-2 bg-white">
                        {options.map((option) => (
                            <Listbox.Option
                                key={option.id}
                                value={option}
                                className={({ active }) =>
                                    `relative py-2 pl-10 pr-4 ${
                                        active && "bg-blue-300 text-white"
                                    }`
                                }
                            >
                                {({ selected }) => (
                                    <>
                                        <span>{option.name}</span>
                                        {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <CheckIcon className="h-5 w-5" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}

function getValueFromResults(results, key) {
    return results
        ? Object.keys(results).includes(key)
            ? results[key]
            : []
        : []
}

export function SearchResultsRender({ results, children }) {
    const books = getValueFromResults(results, "books")
    return (
        <div className="mt-2">
            {!Array.isArray(books) || !books ? (
                <div>No books found</div>
            ) : (
                books.map((book) => <Book key={book.id} book={book} />)
            )}
            {children}
        </div>
    )
}

export function Pagination({
    results,
    page,
    onPrevPageClick,
    onNextPageClick,
}) {
    const books = getValueFromResults(results, "books")
    const pages = getValueFromResults(results, "pages")
    const numRecords = books.length

    console.debug(`Pagination::pages = ${pages}`)
    return (
        <div className="card-actions justify-end items-center m-2">
            {numRecords > 0 ? (
                <>
                    <button
                        className="btn"
                        onClick={onPrevPageClick}
                        disabled={page <= 1}
                    >
                        {"Prev"}
                    </button>
                    <div className="mx-2">Page {page}</div>
                    <button
                        className="btn"
                        onClick={onNextPageClick}
                        disabled={page >= pages}
                    >
                        {"Next"}
                    </button>
                </>
            ) : null}
        </div>
    )
}

function Book({ book }) {
    return (
        <div>
            <span className="mr-4">📖</span>
            <span className="text-lg font-serif font-semibold">
                {book.title}
            </span>{" "}
            by <span className="font-sans">{book.author}</span>
        </div>
    )
}
