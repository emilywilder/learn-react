import "./utilities"
import Card from "./Card"

import Combined from "./Combined"
import Separated from "./Separated"

export default function Unrelated() {
    return (
        <div className="flex flex-col h-full items-center justify-evenly">
            <Card>
                <Card.Title>Combined</Card.Title>
                <Card.Content>
                    This example combines both fetches within the same
                    useEffect().
                </Card.Content>
                <Card.Actions>
                    <Combined />
                </Card.Actions>
            </Card>
            <Card>
                <Card.Title>Separated</Card.Title>
                <Card.Content>
                    This example separates each fetch into their own
                    useEffect().
                </Card.Content>
                <Card.Actions>
                    <Separated />
                </Card.Actions>
            </Card>
        </div>
    )
}
