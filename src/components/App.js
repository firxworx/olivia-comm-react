import React, { useState, useEffect } from 'react'
import styles from './App.module.scss'

import GridLayout from './layout/GridLayout'
import Nav from './Nav'
import SpeechButton from './SpeechButton'
import SoundButton from './SoundButton'

import screens from '../data/items-2x1'

// use SIZE 2 for items-2x1, SIZE 4 for items-2x2
const SIZE = 2

function App() {
  const [ currentScreen, setCurrentScreen ] = useState(0)
  const [ userInteracted, setUserInteracted ] = useState(false)

  const [ width, setWidth ] = useState(window.innerWidth)
  const [ height, setHeight ] = useState(window.innerHeight)

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  })

  const handleBack = () => {
    setCurrentScreen((currentScreen - 1 + screens.length) % screens.length)
  }

  const handleNext = () => {
    setCurrentScreen((currentScreen + 1) % screens.length)
  }

  // note that the initial user interaction enables sounds to play on more browsers
  return (
    <div className={styles.App} style={{ height: height, width: width }}>
      {userInteracted
        ? (
          <div className={styles.ui}>
            <Nav position="top" size={SIZE} backHandler={handleBack} nextHandler={handleNext} />
            <div className={styles.flexStretch}>
              <GridLayout size={SIZE}>
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
            <Nav position="bottom" size={SIZE} backHandler={handleBack} nextHandler={handleNext}/>
          </div>
        )
        : (
          <button onTouchStart={() => setUserInteracted(true)}>Get Started</button>
        )
      }
    </div>
  )
}

export default App
