import LoadingComponent from "./loadingComponent"
import useFetchGameImages from "../api/useFetchGameImagesHook"
import ErrorComponent from "./errorComponent"

type GamePageType = {
    returnHomePage: () => void
}

export default function GamePage({returnHomePage} : GamePageType) {
    const { data, isError, isPending, error, isSuccess, refetch } = useFetchGameImages()
    console.log(data)


    if (isPending) return <LoadingComponent />
    else if (isError) return (
        <>
            <ErrorComponent>{error?.message }</ErrorComponent>
            <button onClick={() => refetch()}>Reload</button>
            <p>Return to home page </p><button onClick={returnHomePage}>HERE</button>
        </>
    )
    else if (isSuccess) return (
        <div className="mx-auto p-4" style={{maxWidth: '1200px'}}>
            <button onClick={() => refetch()}>New Game</button>
            <button onClick={returnHomePage}>Home</button>
            <div className="flex flex-wrap gap-4">
                {data.map((item: { imgURL: string }) => {
                    return (
                        <div className="w-80 h-96" style={{background: `url(${item.imgURL})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'invert(50%)'}}></div>
                    )
                })}
            </div>
        </div>
    )
    else {
        return (
            <>
                <h1>Something went wrong</h1>
                <button onClick={() => refetch()}>Try reload here</button>
                <p>Return to home page </p><button onClick={returnHomePage}>HERE</button>
            </>
        )
        
    }
}