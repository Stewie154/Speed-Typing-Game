import React, {useState, useEffect} from 'react'
import './App.scss'

const App = () => {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(5)
  const [gameOn, setGameOn] = useState(false)

  useEffect( () => {
    if (timeRemaining > 0 && gameOn) {
      setTimeout( () => {
        setTimeRemaining( prevTime => prevTime - 1 )
      }, 1000 )
    }
    else if (timeRemaining === 0) {
      setGameOn(false)
      countWords()
      setTimeRemaining(5)
    }
  }, [timeRemaining, gameOn])

  const handleChange = (event) => {
    event.preventDefault()
    let newText = event.target.value
    setText(newText)
  }

  const countWords = () => {
    let total = text.trim().split(' ').length
    // console.log(total)
    setWordCount(total)
  }

  const startGame = () => {
    setText('')
    setWordCount(0)
    setGameOn(true)
  }

  return (
    <div className="container">
      <header>How Fast Can You Type!?</header>
      <textarea disabled={gameOn ? false : true} onChange={handleChange} value={text} name="" id=""/>
      <h2>Seconds Remaining: {timeRemaining}</h2>
      <button disabled={gameOn ? true : false} className="btn" onClick={startGame}>Start</button>
      <h2>Your Word Count: {wordCount}</h2>
    </div>
  )
}

export default App;
