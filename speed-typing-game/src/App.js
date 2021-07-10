import React, {useState, useEffect, useRef} from 'react'
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from 'react-icons/io'
import { FiRefreshCcw } from 'react-icons/fi'
import './App.scss'
import './Global/variables.scss'
import AOS from "aos";
import "aos/dist/aos.css";
const App = () => {

  const textSamples = [
      "Yo, his palms are sweaty, knees weak, arms are heavy. There's vomit on his sweater already, mom's spaghetti he's nervous. But on the surface he looks calm and ready to drop bombs, but he keeps on forgetting.",
      "What he wrote down, the whole crowd goes so loud. He opens his mouth but the words won't come out. He's chokin', how everybody's jokin' now. The clock's run out, time's up over bloah.",
      "Is this the real life? Is this just fantasy? Caught in a landslide, no escape from reality. Open your eyes, Look up to the skies and see.",
      "I'm just a poor boy, I need no sympathy, because I'm easy come, easy go, little high, little low. Any way the wind blows doesn't really matter to me, to me.",
    "hello."
   ]

  const [text, setText] = useState('')
  const [targetText, setTargetText] = useState(textSamples[Math.floor(Math.random() * textSamples.length)])
  const [wordCount, setWordCount] = useState(0)
  const [correctWords, setCorrectWords] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(15)
  const [leftOverTime, setLeftOverTime] = useState(0)
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

  const changeTargetText = () => {
    setText('')
    let removedCurrent = textSamples.filter(text => text != targetText)
    let randomNum = Math.floor(Math.random() * removedCurrent.length)
    setTargetText(removedCurrent[randomNum])
  }

  const updateTargetTextDisplay = () => {

    let displayText = targetText.split('').map((letter, key) => {

      let color

      if (key < text.length) {
        color = letter === text[key] ? 'green' : 'red'
        return (
          <span className={`letter ${color}`}>{letter}</span>
        )
      } else {
          return (
          <span className={`letter`}>{letter}</span>
        )
      }

    })

    return displayText
  }

  const handleChange = (event) => {
    event.preventDefault()
    let newText = event.target.value
    setText(newText)
    if(text.length === targetText.length) {
      let timeLeft = timeRemaining
      setLeftOverTime(timeLeft)
      endGameEarly()
    }
  }

  const countWords = () => {
    let score = 0
    let wordsAttempted = text.trim().split(' ')
    let comparison = targetText.split(' ').slice(0, wordsAttempted.length) 
    
    for (let i = 0; i < wordsAttempted.length; i++) {
      if (wordsAttempted[i] === comparison[i]) {
        score ++
      }
    }
    console.log(wordsAttempted.length)
    console.log(score)
    setGameOn(false)

    setWordCount(wordsAttempted.length)
    setCorrectWords(score)
    setTimeout( () => {
      setTimeRemaining(30)
    }, 1000)
    
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
    setLeftOverTime(0)
    setText('')
    setWordCount(0)
    setGameOn(true)
    setPlayCount(playCount + 1)
    textAreaRef.current.disabled = false
    textAreaRef.current.focus()
  }

  const endGameEarly = () => {
    setGameOn(false)
    countWords()
  }

  const timerText = gameOn ? 'Seconds Remaining: ' : 'Set timer (seconds) : '

  


  return (
    <div className="container" data-aos="fade-down">

      <header>How Fast Can You Type!?</header>
      
      <div className="target">
        <section className="text">
          <p>{updateTargetTextDisplay()}</p>
        </section>
        {!gameOn && 
          <section className="refresh">
            <FiRefreshCcw onClick={changeTargetText} />
          </section>
        }
      </div>

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
          className={`arrow ${gameOn && 'hide'}`}
          onClick={incrementTimer}
        />
        <IoIosArrowDropdownCircle 
          className={`arrow ${gameOn && 'hide'}`}
          onClick={decrementTimer}
        />
      </div>
      
      <button disabled={gameOn ? true : false} className="btn" onClick={startGame}>{playCount > 0 ? 'Play Again' : 'Start Game'}</button>

      {!gameOn & playCount != 0 &&
        <h2 className="result-message">You attempted <span>{wordCount}</span> words {leftOverTime != 0 && <span>(with {leftOverTime} seconds to spare!)</span>} and spelled <span>{correctWords}</span> of them correctly!</h2> 
      }
      

    </div>
  )
}

export default App;
