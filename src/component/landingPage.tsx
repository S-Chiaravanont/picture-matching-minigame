type LandingPageType = {
    setNewGameFn: () => void
}


export default function LandingPage({setNewGameFn} : LandingPageType) {


    return (
        <>
            <div>Landing Page</div>
            <button onClick={setNewGameFn}>New Game</button>
        </>

    )
}