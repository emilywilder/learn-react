import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const AlertContext = createContext()

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
    {
        id: 8,
        name: 'knight of cups',
        img_url: '/images/knight-of-cups-6686830_1280.jpg',
    },
    {
        id: 9,
        name: 'page of cups',
        img_url: '/images/page-of-cups-6686831_1280.jpg',
    },
    {
        id: 10,
        name: 'three of cups',
        img_url: '/images/three-of-cups-6686834_1280.jpg',
    },
    {
        id: 11,
        name: 'two of cups',
        img_url: '/images/two-of-cups-6686833_1280.jpg',
    },
]

function BadGame() {
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
    }, [isGameOver]) // eslint-disable-line

    function handlePlaceCard(nextCard) {
        if (isGameOver) {
            throw Error('Game already ended.')
        } else {
            setCard(nextCard)
        }
    }

    // ...
    const [alertMsgs, alert] = useContext(AlertContext)

    return (
        <RenderGame round={round} goldCardCount={goldCardCount} handlePlaceCard={handlePlaceCard} isGameOver={isGameOver} alertMsgs={alertMsgs} />
    )
}

function GoodGame() {
    const [card, setCard] = useState(null)
    const [goldCardCount, setGoldCardCount] = useState(0)
    const [round, setRound] = useState(1)
  
    // ✅ Calculate what you can during rendering
    const isGameOver = round > 5
  
    function handlePlaceCard(nextCard) {
        if (isGameOver) {
            throw Error('Game already ended.')
        }
  
        // ✅ Calculate all the next state in the event handler
        setCard(nextCard)
        if (nextCard.gold) {
            if (goldCardCount <= 3) {
                setGoldCardCount(goldCardCount + 1)
            } else {
                setGoldCardCount(0)
                setRound(round + 1)
                if (round === 5) {
                    alert('Good game!')
                }
            }
        }
    }

    // ...
    const [alertMsgs, alert] = useContext(AlertContext)

    return (
        <RenderGame round={round} goldCardCount={goldCardCount} handlePlaceCard={handlePlaceCard} isGameOver={isGameOver} alertMsgs={alertMsgs} />
    )
}

function RenderGame({round, goldCardCount, handlePlaceCard, isGameOver, alertMsgs }) {
    const [cards, setCards] = useState(newCards())
    const [showRound, setShowRound] = useState(true)

    function newCards() {
        // add the gold and selected attributes to each card
        let cards = (cardList.map((c) => {
            return {...c, gold: false, selected: false}
        }))
        // set 4 random cards to be golden
        shuffleArray(cards).slice(0,5).map(c => c.gold = true)
        return cards
    }

    function handleClick(card) {
        if (goldCardCount == 4 && card.gold) {
            setShowRound(false)
        }
        const nextCards = cards.map((c) => {
            if (c.id == card.id) {
                return {...card,
                    selected: true
                }
            } else {
                return c
            }
        })
        setCards(nextCards)
        handlePlaceCard(card)
    }

    function handleNextRound() {
        const nextCards = shuffleArray(newCards())
        setCards(nextCards)
        setShowRound(true)
    }

    return (
        <div>
            <div className="flex flex-col items-center p-2 min-h-[150px]">
                <div className="font-serif text-4xl p-4">Find the golden cards!</div>
                {showRound && (
                    <>
                        <p className="font-bold">Round: {round}</p>
                        <p>Golden cards found: {goldCardCount}/{5}</p>
                    </>
                )}
            </div>
            <div className="relative">
                <div className={`flex flex-wrap justify-center ${!showRound && "blur-sm"}`}>
                    {cards.map((c) => (
                        <Card key={c.id} card={c} onClick={handleClick} />
                    ))}
                </div>
                {!showRound && (
                    <div className="absolute left-0 top-0 h-full w-full">
                        <div className="flex justify-center place-items-center h-full ">
                            {isGameOver ? (
                                <p className="text-3xl">Thanks for playing!</p>
                            ) : (
                                <button
                                    className="p-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl"
                                    onClick={() => handleNextRound()}
                                >
                                    Next Round!
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="m-4 space-y-2">
                {alertMsgs.map(alert => (
                    <div key={alert.id} role="alert" className="alert shadow-md bg-base-100 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{alert.msg}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function CardSpace({ card, children }) {
    let effectClassName = ""
    if (card.selected) {
        effectClassName = card.gold ? "sepia" : "grayscale"
    }

    return (
        // 14:25 aspect ratio
        <div className={`w-[112px] h-[200px] m-2 p-2 rounded-xl bg-base-100 shadow-xl ${effectClassName}`}>
            {children}
        </div>
    )
}

function Card({ card, onClick }) {
    return (
        <CardSpace card={card}>
            <button
                className="card h-full w-full place-items-center"
                onClick={() => onClick(card)}
            >
                <Image fill={true} src={card.img_url} alt={card.name} sizes="112px" />
            </button>
        </CardSpace>
    )
}

function GameSpace({ Game }) {
    const [alertMsgs, setAlertMsgs] = useState([])
    const alertId = useRef(0)

    function alert(msg) {
        setAlertMsgs([
            ...alertMsgs,
            {id: alertId.current, msg: msg }
        ])
        alertId.current++
    }

    return (
        <AlertContext.Provider value={[alertMsgs, alert]}>
            <Game />
        </AlertContext.Provider>
    )
}

export default function App() {
    return (
        <div role="tablist" className="tabs tabs-lifted">
            <input type="radio" name="my_tabs_2" role="tab" className="tab [--tab-bg:theme(colors.base-200)] text-red-500 font-bold" aria-label="useEffect" checked />
            <div role="tabpanel" className="tab-content bg-base-200 border-base-300 rounded-box p-6">
                <GameSpace Game={BadGame} />
            </div>

            <input type="radio" name="my_tabs_2" role="tab" className="tab [--tab-bg:theme(colors.base-200)] text-green-500 font-bold" aria-label="events" />
            <div role="tabpanel" className="tab-content bg-base-200 border-base-300 rounded-box p-6">
                <GameSpace Game={GoodGame} />
            </div>
        </div>
    )
}