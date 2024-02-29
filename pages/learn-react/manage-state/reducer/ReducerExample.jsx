import index_html from './reducerExampleDir/index.html'
import './reducerExampleDir/index.js'

export default function App() {
    return (
        <>
            <h1>Example of reducer results:</h1>
            <div dangerouslySetInnerHTML={{__html: index_html}} />
        </>
    )
}
