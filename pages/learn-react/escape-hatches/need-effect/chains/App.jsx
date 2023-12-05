import Image from "next/image";
import { useEffect, useState } from "react";

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
        gold: false,
    },
    {
        id: 2,
        name: 'the hanged man',
        location: '/images/hanged-man-6016939_1280.jpg',
        gold: false,
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
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-3 grid-rows-2 my-10">
                <Blank /><Blank /><Blank />
                <Card id={0} />
                <Card id={1} />
                <Card id={2} />
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

function Card({ id }) {
    const card = cards.find(c => c.id === id)
    return (
        <CardSpace>
            <button className="card shadow-xl place-items-center">
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