import Header from './Components/Header/Header'
import TypingArea from './Components/TypingArea/TypingArea'
import './App.scss'

const App = () => {
  return (
    <div className="container">
      <Header/>
      <TypingArea/>
      <Header/>
    </div>
  )
}

export default App;
