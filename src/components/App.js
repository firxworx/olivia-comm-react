import React, { useState } from 'react'
import styles from './App.module.scss'

import GridLayout from './layout/GridLayout'
import Button from './Button'

let screens = [
  [
    { name: 'food', caption: '🍔', sound: 'bite' },
    { name: 'mom', caption: '👩', sound: 'mom' },
    { name: 'yes', caption: '😊', sound: 'yes2' },
    { name: 'no', caption: '🙁', sound: 'no' },
  ],
  [
    { name: 'poop1', caption: '💩', sound: 'fart' },
    { name: 'poop2', caption: '💩', sound: 'fart' },
    { name: 'bell1', caption: '🔔', sound: 'doorbell' },
    { name: 'bell2', caption: '🔔', sound: 'doorbell' },
  ],
]

function Nav({ backHandler, nextHandler }) {
  return (
    <nav className={styles.Nav}>
      <button onClick={backHandler}>back</button>
      <button onClick={nextHandler}>next</button>
    </nav>
  )
}

function App() {
  const [ currentScreen, setCurrentScreen ] = useState(0)

  const handleBack = () => {
    setCurrentScreen((currentScreen - 1 + screens.length) % screens.length)
  }

  const handleNext = () => {
    setCurrentScreen((currentScreen + 1) % screens.length)
  }

  return (
    <div className={styles.App}>
      <Nav backHandler={handleBack} nextHandler={handleNext}/>
      <div className={styles.flexStretch}>
        <GridLayout>
          {screens[currentScreen].map(item => (
            <Button key={item.name} sound={item.sound}>
              <span role="img" aria-label={item.name}>{item.caption}</span>
            </Button>
          ))}
        </GridLayout>
      </div>
      <Nav backHandler={handleBack} nextHandler={handleNext}/>
    </div>
  )
}

export default App
