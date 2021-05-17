import React, {useState, useEffect} from 'react'
import './App.scss'

const App = () => {
  const [text, setText] = useState('')

  const handleChange = (event) => {
    event.preventDefault()
    let newText = event.target.value
    setText(newText)
  }

  return (
    <div className="container">
      <header>How Fast Can You Type!?</header>
      <textarea onChange={handleChange} value={text} name="" id=""/>
      <h2>Time Remaining: ???</h2>
      <button className="btn">Start</button>
    </div>
  )
}

export default App;
