import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import BarChart from "./Chart"

function Spinner({ size = "md" }) {
    return (
        <div className="flex justify-center place-items-center h-full p-2">
            <span className={`loading loading-spinner loading-${size}`}></span>
        </div>
    )
}

export default function ShippingFormRender({
    country,
    cities,
    city,
    setCity,
    areas,
    fetchingCities,
    fetchingAreas,
}) {
    return (
        <div className="flex flex-col space-y-2">
            <div className="z-20">
                {Array.isArray(cities) && cities.length > 0 ? (
                    <ListboxSelect
                        options={cities}
                        selected={city || "Select a city"}
                        setSelected={setCity}
                        fetching={fetchingCities}
                    />
                ) : (
                    <>{country && <Spinner />}</>
                )}
            </div>
            <div className="z-10">
                {Array.isArray(areas) && areas.length > 0 ? (
                    <div className="h-full w-full relative">
                        <BarChart
                            title={`Areas of ${city}, ${country}`}
                            dataset={areas}
                        />
                        {fetchingAreas && (
                            <div className="absolute left-0 top-0 h-full w-full glass rounded">
                                <Spinner size={"lg"} />
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {fetchingAreas && (
                            <div className="h-48">
                                <Spinner size={"lg"} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

// taken from https://headlessui.com/react/listbox
export function ListboxSelect({ options, selected, setSelected, fetching }) {
    return (
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm">
                    <span className="block truncate">{selected}</span>

                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {fetching && (
                            <span className="loading loading-spinner loading-sm" />
                        )}
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {options.map((option) => (
                            <Listbox.Option
                                key={option}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                            ? "bg-blue-100 text-blue-900"
                                            : "text-gray-900"
                                    }`
                                }
                                value={option}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {option}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        ) : null}
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
