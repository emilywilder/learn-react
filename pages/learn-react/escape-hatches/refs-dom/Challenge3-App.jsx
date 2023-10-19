import { useRef, useState } from "react"

export default function CatFriends() {
    const [index, setIndex] = useState(0)
    const catRef = useRef({})
    const scrollOptions = {
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    }

    return (
        <>
            <nav>
                <button onClick={() => {
                    const _index = index < catList.length - 1 ? index + 1 : 0
                    setIndex(_index)
                    catRef.current[_index].scrollIntoView(scrollOptions)
                }}>
                    Next
                </button>
            </nav>
            <div>
                <ul>
                    {catList.map((cat, i) => (
                        <li key={cat.id} ref={(node) => {
                            catRef.current[cat.id] = node
                        }}>
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