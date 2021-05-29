import React, {useState, useEffect, useRef} from 'react'
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from 'react-icons/io'
import './App.scss'
import './Global/variables.scss'
import AOS from "aos";
import "aos/dist/aos.css";
const App = () => {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [gameOn, setGameOn] = useState(false)
  const [playCount, setPlayCount] = useState(0)
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

  useEffect(() => {
    AOS.init({
      duration : 1500
    });
  }, []);

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

  const incrementTimer = () => {
    setTimeRemaining(prevTime => prevTime + 5)
  }
  const decrementTimer = () => {
    setTimeRemaining(prevTime => prevTime > 0 ? prevTime - 5 : 0)
  }

  const startGame = () => {
    if (timeRemaining < 1) {
      alert('You must set your time before starting!')
      return
    }
    textAreaRef.current.focus()
    setText('')
    setWordCount(0)
    setGameOn(true)
    setPlayCount(playCount + 1)
    textAreaRef.current.disabled = false
    textAreaRef.current.focus()
  }

  const timerText = gameOn ? 'Seconds Remaining: ' : 'Set timer (seconds) : '

  return (
    <div className="container" data-aos="fade-down">
      <header>How Fast Can You Type!?</header>
      <textarea 
        disabled={gameOn ? false : true} 
        onChange={handleChange} 
        value={text} 
        ref={textAreaRef}
      
      />
      <div className="timer" style={gameOn ? {backgroundColor: 'green'} : {backgroundColor: 'rgb(10, 10, 10)'}}>
        <h2>
          {timerText}
          <span style={timeRemaining <= 3 ? { color: 'red' } : { color: 'rgb(16, 189, 16)' }}>
            {timeRemaining}
          </span>
        </h2>
        <IoIosArrowDropupCircle 
          className="arrow"
          onClick={incrementTimer}
        />
        <IoIosArrowDropdownCircle 
          className="arrow"
          onClick={decrementTimer}
        />
      </div>
      
      <button disabled={gameOn ? true : false} className="btn" onClick={startGame}>{playCount > 0 ? 'Play Again' : 'Start Game'}</button>
      <h2>Your Word Count: <span className="red">{playCount > 0 ? wordCount : '???'}</span></h2>
    </div>
  )
}

export default App;
