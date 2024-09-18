import { useState } from 'react'
import LandingPage from './component/landingPage'
import GamePage from './component/gamePage'

function App() {

  const [newGame, setNewGame] = useState(false)
  const setNewGameFn = () => {
    setNewGame(true)
  }
  const returnHomePage = () => {
    setNewGame(false)
  }

  return (
    <>
      {!newGame ? <LandingPage setNewGameFn={setNewGameFn} /> : <GamePage returnHomePage={returnHomePage} />}
    </>
  )
}

export default App
