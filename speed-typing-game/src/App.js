import React, {useState, useEffect} from 'react'
import './App.scss'

const App = () => {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(5)

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

  return (
    <div className="container">
      <header>How Fast Can You Type!?</header>
      <textarea onChange={handleChange} value={text} name="" id=""/>
      <h2>Seconds Remaining: {timeRemaining}</h2>
      <button className="btn" onClick={() => countWords()}>Start</button>
      <h2>Your Word Count: {wordCount}</h2>
    </div>
  )
}

export default App;
