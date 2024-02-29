import { useState } from 'react';

function Square({value, onSquareClick, winner}) {
    const className = winner ? 'square_win' : 'square'
    return (
        <button className={className} onClick={onSquareClick}>
            {value}
        </button>
    )
}

function Board({ xIsNext, squares, onPlay }) {
    const winner = calculateWinner(squares);
    const draw = determineDraw(squares)

    let winningLines = []
    let status
    if (winner) {
        status = "Winner: " + winner
        winningLines = getWinningLines(squares)
    } else if (draw) {
        status = "Draw!"
    } else {
        status = "Next player: " + (xIsNext ? 'X' : 'O')
    }

    function squarePosToRowColumn(x) {
        return Math.floor(x / 3) + ',' + x % 3
    }

    function handleClick(i) {
        // only handle click if square selected is empty
        if (!squares[i]) {
            // if no winner
            if (!calculateWinner(squares)) {
                // make a copy to update
                const nextSquares = squares.slice()
                if (xIsNext) {
                    nextSquares[i] = 'X'
                } else {
                    nextSquares[i] = 'O'
                }
                onPlay(nextSquares, squarePosToRowColumn(i))
            }
        }
    }

    return (
        <>
            <div className='status'>{status}</div>
            {
                [[0,1,2], [3,4,5], [6,7,8]].map((i) => (
                    <div className='board-row' key={i}>
                        {
                            i.map((j) => (
                                <Square value={squares[j]}
                                    onSquareClick={() => handleClick(j)}
                                    winner={winningLines.includes(j)}
                                    key={j} />
                            ))
                        }
                    </div>
                ))
            }

        </>
    );
}

function getWinningLines(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [3, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
            return lines[i]
        }
    }
    return []

}

function determineDraw(squares) {
    return (!squares.includes(null) && !calculateWinner(squares))
}

function calculateWinner(squares) {
    const winningLines = getWinningLines(squares)
    if (winningLines) {
        return squares[winningLines[0]]
    } else {
        return null
    }
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const [posHistory, setPosHistory] = useState(Array)
    const xIsNext = currentMove % 2 == 0
    const currentSquares = history[currentMove]

    function handlePlay(nextSquares, pos) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        const nextPosHistory = [...posHistory.slice(0, currentMove + 1), pos]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
        setPosHistory(nextPosHistory)
    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className='game-info'>
                <Moves history={history} posHistory={posHistory} jumpTo={setCurrentMove} />
            </div>
        </div>
    )
}

function Moves({history, posHistory, jumpTo}) {
    const [descendingOrder, setDescendingOrder] = useState(true)
    
    const moves = history.map((squares, move) => {
        let description
        if (move == history.length - 1) {
            if (move == 0) {
                description = 'You are at game start'
            } else {
                description = 'You are at move #' + move
            }
            return (
                <li key={move}>
                    {description}
                </li>
            )
        } else if (move > 0) {
            description = 'Go to move #' + move + ' at position (' + posHistory[move] + ')'
        } else {
            description = 'Go to game start'
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })
    return (
        <>
            <div>
                <button onClick={() => setDescendingOrder(!descendingOrder)}>Toggle Order</button>
            </div>
            <ol>
                {descendingOrder ? moves : moves.reverse()}
            </ol>
        </>
    )
}