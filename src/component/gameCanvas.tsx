import '../styles.css'
type imgDataType = {
    imgURL: string,
    index: number,
    cardIndex: number,
    handleSetSelectedCard: (e:React.MouseEvent<HTMLElement> , cardIndex: number, index: number) => void
}

export default function GameCanvas({ imgURL, index, cardIndex, handleSetSelectedCard }: imgDataType) {

    return (
        <div id={`imgIndex-${index}`} className={`w-60 h-80 imgCardDiv hideCard`} onClick={(e: React.MouseEvent<HTMLElement>) => handleSetSelectedCard(e, index, cardIndex)} >
            <img className="w-full h-full object-cover" src={imgURL} alt={imgURL} />
        </div>
    )
}