import Image from "next/image";
import { useEffect, useState } from "react";

// taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(arr) {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

}

const cards = [
    {
        id: 0,
        name: 'chariot',
        location: '/images/chariot-6016921_1280.jpg',
        gold: false,
    },
    {
        id: 1,
        name: 'empress',
        location: '/images/empress-6016923_1280.jpg',
        gold: true,
    },
    {
        id: 2,
        name: 'the hanged man',
        location: '/images/hanged-man-6016939_1280.jpg',
        gold: false,
    },
    {
        id: 3,
        name: 'hermit',
        location: '/images/hermit-6016941_1280.jpg',
        gold: true,
    },
    {
        id: 4,
        name: 'hierophant',
        location: '/images/hierophant-6016942_1280.jpg',
        gold: false,
    },
    {
        id: 5,
        name: 'king of cups',
        location: '/images/king-of-cups-6686829_1280.jpg',
        gold: true,
    },
]

function Game() {
    const [card, setCard] = useState(null)
    const [goldCardCount, setGoldCardCount] = useState(0)
    const [round, setRound] = useState(1)
    const [isGameOver, setIsGameOver] = useState(false)

    // 🔴 Avoid: Chains of Effects that adjust the state solely to trigger each other
    useEffect(() => {
        if (card !== null && card.gold) {
            setGoldCardCount(c => c + 1)
        }
    }, [card])

    useEffect(() => {
        if (goldCardCount > 3) {
            setRound(r => r + 1)
            setGoldCardCount(0)
        }
    }, [goldCardCount])

    useEffect(() => {
        if (round > 5) {
            setIsGameOver(true)
        }
    }, [round])

    useEffect(() => {
        alert('Good game!')
    }, [isGameOver])

    function handlePlaceCard(nextCard) {
        if (isGameOver) {
            throw Error('Game already ended.')
        } else {
            setCard(nextCard)
        }
    }

    // ...
    const cardIds = shuffleArray(Array.from(Array(6).keys()))

    return (
        <div>
            <div className="flex flex-col items-center p-2">
                <div className="font-serif text-4xl p-4">Find the golden cards!</div>
                <p className="font-bold">Round: {round}</p>
                <p>Golden cards found: {goldCardCount}/{3}</p>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-3 grid-rows-2">
                    {cardIds.map((i) => (
                        <Card key={i} id={i} onClick={handlePlaceCard} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function Blank() {
    return (
        <CardSpace>
            <div className="h-full border-4 rounded-xl border-black flex items-center justify-center bg-base-100">
                Place a card here.
            </div>
        </CardSpace>
    )
}

function CardSpace({ children }) {
    return (
        <div className="w-48 h-128 m-4">
            {children}
        </div>
    )
}

function Card({ id, onClick }) {
    const card = cards.find(c => c.id === id)
    return (
        <CardSpace>
            <button
                className="card shadow-xl place-items-center"
                onClick={() => onClick(card)}
            >
                <Image width={720} height={1280} src={card.location} alt={card.name} />
            </button>
        </CardSpace>
    )
}

export default function App() {
    return (
        <div className="bg-base-200 h-screen">
            <Game />
        </div>
    )
    
}