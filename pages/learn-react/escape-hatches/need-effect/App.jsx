import { useEffect, useState } from "react"

function BadList({ items }) {
    const [isReverse, setIsReverse] = useState(false);
    const [selection, setSelection] = useState(null);
  
    // 🔴 Avoid: Adjusting state on prop change in an Effect
    useEffect(() => {
      setSelection(null);
    }, [items]);
    // ...
    const selectedId = selection ? selection.id : null
    function handleChange(id) {
        const selection = items.find((x) => x.id === id)
        setSelection(selection)
    }
    return <ListItems items={items} selectedId={selectedId} onChange={handleChange}/>
}

function BetterList({ items }) {
    const [isReverse, setIsReverse] = useState(false);
    const [selection, setSelection] = useState(null);
  
    // Better: Adjust the state while rendering
    const [prevItems, setPrevItems] = useState(items);
    if (items !== prevItems) {
      setPrevItems(items);
      setSelection(null);
    }
    // ...
    const selectedId = selection ? selection.id : null
    function handleChange(id) {
        const selection = items.find((x) => x.id === id)
        setSelection(selection)
    }
    return <ListItems items={items} selectedId={selectedId} onChange={handleChange}/>
}

function BestList({ items }) {
    const [isReverse, setIsReverse] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    // ✅ Best: Calculate everything during rendering
    const selection = items.find(item => item.id === selectedId) ?? null;
    // ...
    function handleChange(id) {
        setSelectedId(id)
    }
    return <ListItems items={items} selectedId={selectedId} onChange={handleChange}/>
}

function ListItems({ items, selectedId, onChange }) {
    return (
        <form>
            {items.map((x) => (
                <label key={x.id}>
                    <input
                        className="sr-only peer"
                        type="radio"
                        name={x.item}
                        value={x.item}
                        checked={x.id === selectedId}
                        onChange={() => onChange(x.id)}
                    />
                    <div className="rounded p-1 peer-checked:text-white peer-checked:bg-blue-400">
                        {x.item}
                    </div>
                </label>

            ))}
        </form>
    )
}

export default function App() {
    const [person, setPerson] = useState('')
    const filteredItems = items.filter((x) => x.name === person)

    return (
        <div className="m-3">
            <form className="flex flex-wrap">
                {getUniqueNames(items).map((name) => (
                    <label key={name}>
                    <input
                        className="sr-only peer"
                        type="radio"
                        name={name}
                        value={name}
                        checked={name === person}
                        onChange={e => setPerson(e.target.value)}
                    />
                    <div className="text-sm p-2 rounded-lg peer-checked:bg-blue-400 peer-checked:text-white">
                        {name}
                    </div>
                </label>
                ))}
            </form>
            { person ? (
                <div className="grid grid-cols-3 gap-4 place-items-center">
                    <div className="text-red-700">useEffect</div>
                    <div className="col-span-2">
                        <BadList items={filteredItems} />
                    </div>                
                    <div className="text-yellow-500">Change state</div>
                    <div className="col-span-2">
                        <BetterList items={filteredItems} />
                    </div>
                    <div className="text-green-700">Calculate</div>
                    <div className="col-span-2">
                        <BestList items={filteredItems} />
                    </div>
                </div>
            ) : (
                <div className="mt-3 ms-3">Select a person to see their list items.</div>
            )}
        </div>
    )
}
function getUniqueNames(list) {
    const names = list.map((x) => x.name)
    return [...new Set(names)]
}

const items = [
    {
        id: 0,
        name: 'Betty',
        item: 'Oat Milk',
    },
    {
        id: 1,
        name: 'Veronica',
        item: 'Bagels',
    },
    {
        id: 2,
        name: 'Betty',
        item: 'Tofu',
    },
    {
        id: 3,
        name: 'Veronica',
        item: 'Coffee',
    },
    {
        id: 4,
        name: 'Veronica',
        item: 'Milk',
    },
]