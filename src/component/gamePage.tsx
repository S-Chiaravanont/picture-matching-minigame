import LoadingComponent from "./loadingComponent"
import useFetchGameImages from "../api/useFetchGameImagesHook"
import ErrorComponent from "./errorComponent"
import React, { useState } from "react"
import GameCanvas from "./gameCanvas"

type GamePageType = {
    returnHomePage: () => void
}

export default function GamePage({ returnHomePage }: GamePageType) {
    const [firstCard, setFirstCard] = useState<number | null>(null)
    const [firstCardEl, setFirstCardEl] = useState<HTMLElement | null>(null)
    const [matchesFound, setMatchesFound] = useState<number>(0)
    const [lockBoard, setLockBoard] = useState(false);
    // let lockBoard = false;
    const { data, isError, isPending, error, isSuccess, refetch } = useFetchGameImages()
    console.log('data', data)

    const ReloadButton = ({children}: React.PropsWithChildren) => {
        return (
            <button onClick={() => refetch()}>{ children }</button>
        )
    }

    const handleSetSelectedCard = (e: React.MouseEvent<HTMLElement>, index: number, cardIndex: number) => {
        console.log('cardIndex', cardIndex)
        if (!data) return
        if (lockBoard) return;
        const clickedElement = e.currentTarget;

        // Ignore the click if the picture is already revealed or matched
        if (!clickedElement.classList.contains('hideCard') || cardIndex === firstCard) {
            console.log('ignore', !clickedElement.classList.contains('hideCard'))
            console.log('ignore cardIndex', cardIndex === firstCard)
            console.log('cardIndex', cardIndex)
            console.log('firstcard', firstCard)
            return;
        }

        // Reveal the clicked picture
        revealPicture(clickedElement);

        if (!firstCard) {
            // First picture selected
            setFirstCard(cardIndex);
            setFirstCardEl(clickedElement)
        } else {
            // Second picture selected
            // setLockBoard(true);

            // Check if the two selected pictures match
            console.log('data[firstCard].index', data[firstCard].index)
            if (data[firstCard].index === index) {
                // Pictures match
                setFirstCard(null);
                setFirstCardEl(null);
                // setLockBoard(false);
                const currentMatches = matchesFound + 1
                
                // Check if the game is over
                if (currentMatches === data?.length / 2) {
                    alert('You matched all pictures!');
                    setMatchesFound(0);
                    return
                }
                setMatchesFound(prev => prev + 1)
            } else {
                // No match, cover the pictures again after a short delay
                setTimeout(() => {
                    coverPicture(firstCardEl);
                    coverPicture(clickedElement);
                    setFirstCard(null);
                    // setLockBoard(false);
                }, 1000); // Delay before flipping back
            }
        }

        // Helper functions to reveal and cover pictures
        function revealPicture(element: HTMLElement | null) {
            if (!element) return;
            element.classList.remove('hideCard'); // Add a class to show the picture
        }

        function coverPicture(element: HTMLElement | null) {
            if (!element) return;
            element.classList.add('hideCard'); // Remove the class to hide the picture
        }
    }

    if (isPending) return <LoadingComponent />
    else if (isError) return (
        <>
            <ErrorComponent>{error?.message }</ErrorComponent>
            <ReloadButton>Reload</ReloadButton>
            <p>Return to home page </p><button onClick={returnHomePage}>HERE</button>
        </>
    )
    else if (isSuccess && data) return (
        <div className="mx-auto p-4" style={{ maxWidth: '1200px' }}>
            <ReloadButton>New Game</ReloadButton>
            <div className="flex flex-wrap gap-4">
                {data.map((item: { imgURL: string, index: number }, index: number) => {
                     return (
                         <GameCanvas key={index} {...item} cardIndex={index} handleSetSelectedCard={handleSetSelectedCard} />
                     )
                 })}
             </div>
        </div>
    )
    else {
        return (
            <>
                <h1>Something went wrong</h1>
                <ReloadButton>Try reload</ReloadButton>
                <p>Return to home page </p><button onClick={returnHomePage}>HERE</button>
            </>
        )
        
    }
}