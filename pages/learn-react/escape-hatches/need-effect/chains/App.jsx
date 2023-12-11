import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";

const CardContext = createContext()

// taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(arr) {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

}

const cardList = [
    {
        id: 0,
        name: 'chariot',
        img_url: '/images/chariot-6016921_1280.jpg',
    },
    {
        id: 1,
        name: 'empress',
        img_url: '/images/empress-6016923_1280.jpg',
    },
    {
        id: 2,
        name: 'the hanged man',
        img_url: '/images/hanged-man-6016939_1280.jpg',
    },
    {
        id: 3,
        name: 'hermit',
        img_url: '/images/hermit-6016941_1280.jpg',
    },
    {
        id: 4,
        name: 'hierophant',
        img_url: '/images/hierophant-6016942_1280.jpg',
    },
    {
        id: 5,
        name: 'king of cups',
        img_url: '/images/king-of-cups-6686829_1280.jpg',
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

    const [cards, setCards, newCards] = useContext(CardContext)
    if (goldCardCount > 3) {
        const shuffledCards = shuffleArray(newCards())
        setCards(shuffledCards)
    }

    function handleClick(card) {
        const newCards = cards.map((c) => {
            if (c.id == card.id) {
                return {...card,
                    selected: true
                }
            } else {
                return c
            }
        })
        console.log(newCards)
        setCards(newCards)
        handlePlaceCard(card)
    }

    return (
        <div>
            <div className="flex flex-col items-center p-2">
                <div className="font-serif text-4xl p-4">Find the golden cards!</div>
                <p className="font-bold">Round: {round}</p>
                <p>Golden cards found: {goldCardCount}/{4}</p>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-3 grid-rows-2">
                    {cards.map((c) => (
                        <Card key={c.id} card={c} onClick={handleClick} />
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

function Card({ card, onClick }) {
    // const [borderClassName, setBorderClassName] = useState("")
    let borderClassName = ""
    if (card.selected) {
        if (card.gold) {
            borderClassName = "border-4 border-yellow-500"
        }
    }
    return (
        <CardSpace>
            <button
                className={`card shadow-xl place-items-center ${borderClassName}`}
                onClick={() => onClick(card)}
            >
                <Image width={720} height={1280} src={card.img_url} alt={card.name} />
            </button>
        </CardSpace>
    )
}

export default function App() {
    const [cards, setCards] = useState(newCards())

    function newCards() {
        // add the gold and selected attributes to each card
        let cards = (cardList.map((c) => {
            return {...c, gold: false, selected: false}
        }))
        // set 4 random cards to be golden
        shuffleArray(cards).slice(0,4).map(c => c.gold = true)
        return cards
    }

    return (
        <div className="bg-base-200 h-screen">
            <CardContext.Provider value={[cards, setCards, newCards]}>
                <Game />
            </CardContext.Provider>
        </div>
    )
    
}