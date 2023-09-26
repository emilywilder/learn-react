import Image from './Image'
import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'

// NextJS requires an exported default function, and
// have to use useEffect to ensure the content is not
// rendered server side, where document is undefined
// NextJS also uses __next as the root element id
export default function Home() {
    useEffect(() => {
        if (document) {
            const root = createRoot(document.getElementById('__next'))
            root.render(<Image />)
        }
      }, []);
}
