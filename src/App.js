import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti'
import './App.css';

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#fc47ab" : "white"
  }
  return (  
    <div className='dice-face' style={styles} onClick={props.holdDice}>
      <h2>{props.value}</h2>
    </div>
  )
}

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i=0; i<10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
        setTenzies(false)
        setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>TENZIES</h1>
      <p className='instructions'>Roll until all the dice are same. Click each die to freeze it at it's current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button onClick={rollDice} className='roll-btn'>{tenzies ? "NEW GAME" : "ROLL"}</button>
    </main>
  );
}

export default App;