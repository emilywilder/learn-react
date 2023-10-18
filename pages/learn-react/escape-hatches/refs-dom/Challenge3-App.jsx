import { useState } from "react"

export default function CatFriends() {
    const [index, setIndex] = useState(0)
    return (
        <>
            <nav>
                <button onClick={() => {
                    if (index < catList.length - 1) {
                        setIndex(index + 1)
                    } else {
                        setIndex(0)
                    }
                }}>
                    Next
                </button>
            </nav>
            <div>
                <ul>
                    {catList.map((cat, i) => (
                        <li key={cat.id}>
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