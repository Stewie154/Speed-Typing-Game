import React, {useState, useEffect, useRef} from 'react'
import './App.scss'
import './Global/variables.scss'

const App = () => {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(5)
  const [gameOn, setGameOn] = useState(false)
  const textAreaRef = useRef()

  useEffect( () => {
    if (timeRemaining > 0 && gameOn) {
      setTimeout( () => {
        setTimeRemaining( prevTime => prevTime - 1 )
      }, 1000 )
    }
    else if (timeRemaining === 0) {
      setGameOn(false)
      countWords()
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
    setTimeRemaining(5)
    textAreaRef.current.focus()
    setText('')
    setWordCount(0)
    setGameOn(true)
    textAreaRef.current.disabled = false
    textAreaRef.current.focus()
  }

  return (
    <div className="container">
      <header>How Fast Can You Type!?</header>
      <textarea 
        disabled={gameOn ? false : true} 
        onChange={handleChange} 
        value={text} 
        ref={textAreaRef}
      
      />
      <h2>
        Seconds Remaining: 
        <span style={timeRemaining <= 3 ? { color: 'red' } : { color: 'rgb(16, 189, 16)' }}>
          {timeRemaining}
        </span>
      </h2>
      <button disabled={gameOn ? true : false} className="btn" onClick={startGame}>Start</button>
      <h2>Your Word Count: <span className="red">{wordCount}</span></h2>
    </div>
  )
}

export default App;
