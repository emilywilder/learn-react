import Image from "next/image";
import { useEffect, useState } from "react";

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
    {
        id: 6,
        name: 'temperance',
        img_url: '/images/temperance-6016917_1280.jpg',
    },
    {
        id: 7,
        name: 'the fool',
        img_url: '/images/the-fool-6016940_1280.jpg',
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
    const [cards, setCards] = useState(newCards())
    const [showRound, setShowRound] = useState(true)
    
    function newCards() {
        // add the gold and selected attributes to each card
        let cards = (cardList.map((c) => {
            return {...c, gold: false, selected: false}
        }))
        // set 4 random cards to be golden
        shuffleArray(cards).slice(0,4).map(c => c.gold = true)
        return cards
    }

    function handleClick(card) {
        let nextCards
        if (goldCardCount == 3 && card.gold) {
            nextCards = shuffleArray(newCards())
            setShowRound(false)
        } else {
            nextCards = cards.map((c) => {
                if (c.id == card.id) {
                    return {...card,
                        selected: true
                    }
                } else {
                    return c
                }
            })
        }
        setCards(nextCards)
        handlePlaceCard(card)
    }

    return (
        <div>
            {showRound ? (
                <div>
                    <div className="flex flex-col items-center p-2">
                        <div className="font-serif text-4xl p-4">Find the golden cards!</div>
                        <p className="font-bold">Round: {round}</p>
                        <p>Golden cards found: {goldCardCount}/{4}</p>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        {cards.map((c) => (
                            <Card key={c.id} card={c} onClick={handleClick} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="h-96">
                    <div className="flex justify-center place-items-center h-full ">
                        {isGameOver ? (
                            <p className="text-3xl">Thanks for playing!</p>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowRound(true)}
                            >
                                Next Round!
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

function CardSpace({ highlight, children }) {
    const hl_ClassName = highlight ? "border-4 rounded-xl border-yellow-500" : ""
    return (
        <div className={`w-[140px] h-[250px] m-2 p-2 ${hl_ClassName}`}>
            {children}
        </div>
    )
}

function Card({ card, onClick }) {
    return (
        <CardSpace highlight={card.selected && card.gold}>
            <button
                className="card h-full w-full shadow-xl place-items-center"
                onClick={() => onClick(card)}
            >
                <Image fill={true} src={card.img_url} alt={card.name} />
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