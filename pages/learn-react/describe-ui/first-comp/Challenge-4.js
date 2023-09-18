// Write your component below!

export { Congratulations as Challenge4 }

function YouDidIt() {
    return (
        <img
            src="https://i.kym-cdn.com/photos/images/newsfeed/001/569/889/210.gif"
            alt="You did it"    
        />
    )
}

function GoodJob() {
    return (
        <h1>Good job!</h1>
    )
}

export default function Congratulations() {
    return (
        <>
            <GoodJob />
            <YouDidIt />
        </>
    )
}