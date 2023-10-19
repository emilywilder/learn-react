import { useRef, useState } from "react"
import { flushSync } from "react-dom"

export default function CatFriends() {
    const [index, setIndex] = useState(0)
    const catRef = useRef({})

    return (
        <>
            <nav>
                <button onClick={() => {
                    flushSync(() => {
                        if (index < catList.length - 1) {
                            setIndex(index + 1)
                        } else {
                            setIndex(0)
                        }
                    })
                    catRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    })
                }}>
                    Next
                </button>
            </nav>
            <div>
                <ul>
                    {catList.map((cat, i) => (
                         // set catRef if li is "selected"
                        <li key={cat.id} ref={index === i ? catRef : null}>
                            <img
                                className={index === i ? 'active': ''}
                                src={cat.imageUrl}
                                alt={'Cat #' + cat.id}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

const catList = []
for (let index = 0; index < 10; index++) {
    catList.push({
        id: index,
        imageUrl: 'https://placekitten.com/250/200?image=' + index
    })    
}