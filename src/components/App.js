import React, { useState } from 'react'
import styles from './App.module.scss'

import { IoIosArrowRoundBack } from 'react-icons/io'
import { IoIosArrowRoundForward } from 'react-icons/io'

import GridLayout from './layout/GridLayout'
import SpeechButton from './SpeechButton'
import SoundButton from './SoundButton'

let screens = [
  [
    { name: 'food', caption: '🍔', sound: 'bite' },
    { name: 'mom', caption: '👩', sound: 'mom' },
    { name: 'yes', caption: '😊', sound: 'yes' },
    { name: 'no', caption: '🙁', sound: 'no' },
  ],
  [
    { name: 'fart', caption: '💩', sound: 'fart' },
    { name: 'bell', caption: '🔔', sound: 'doorbell' },
    { name: 'cat', caption: '🐯', sound: null, say: 'meow' },
    { name: 'hug', caption: '🤗', sound: null, say: 'hug me' },
  ],
  [
    { name: 'stop', caption: '🛑', sound: null, say: 'stop' },
    { name: 'go', caption: '🏁', sound: null, say: 'go' },
    { name: 'less', caption: '👎', sound: null, say: 'less' },
    { name: 'more', caption: '👍', sound: null, say: 'more' },
  ],
  [
    { name: 'tv', caption: '📺', sound: null, say: 'TV' },
    { name: 'ball', caption: '⚽', sound: null, say: 'ball' },
    { name: 'book', caption: '📖', sound: null, say: 'book' },
    { name: 'music', caption: '🎹', sound: null, say: 'music' }, // 🎶
  ],
]

function Nav({ position, backHandler, nextHandler }) {
  return (
    <nav className={styles.Nav}>
      <button data-position={position} onClick={backHandler}><IoIosArrowRoundBack /></button>
      <button data-position={position} onClick={nextHandler}><IoIosArrowRoundForward /></button>
    </nav>
  )
}

function App() {
  const [ currentScreen, setCurrentScreen ] = useState(0)
  const [ userInteracted, setUserInteracted ] = useState(false)

  const handleBack = () => {
    setCurrentScreen((currentScreen - 1 + screens.length) % screens.length)
  }

  const handleNext = () => {
    setCurrentScreen((currentScreen + 1) % screens.length)
  }

  return (
    <div className={styles.App}>
      {userInteracted
        ? (
          <div className={styles.ui}>
            <Nav position="top" backHandler={handleBack} nextHandler={handleNext}/>
            <div className={styles.flexStretch}>
              <GridLayout>
                {screens[currentScreen].map(item => (
                  <React.Fragment key={item.name}>
                    {(item.sound && !item.say) && (
                      <SoundButton sound={item.sound}>
                        <span role="img" aria-label={item.name}>{item.caption}</span>
                      </SoundButton>
                    )}
                    {(!item.sound && item.say) && (
                      <SpeechButton say={item.say}>
                        <span role="img" aria-label={item.name}>{item.caption}</span>
                      </SpeechButton>
                    )}
                  </React.Fragment>
                ))}
              </GridLayout>
            </div>
            <Nav position="bottom" backHandler={handleBack} nextHandler={handleNext}/>
          </div>
        )
        : (
          <button onClick={() => setUserInteracted(true)}>Get Started</button>
        )
      }
    </div>
  )
}

export default App
