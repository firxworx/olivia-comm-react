import React, { useEffect, useRef } from 'react'
import styles from './Button.module.scss'

import bite from '../assets/sounds/bite.mp3'
import buzzer from '../assets/sounds/buzzer.mp3'
import doorbell from '../assets/sounds/doorbell.mp3'
import fart from '../assets/sounds/fart.mp3'
import mom from '../assets/sounds/mom.wav'
import no from '../assets/sounds/no.wav'
import yes from '../assets/sounds/yes.wav'

const sfx = {
  bite,
  buzzer,
  doorbell,
  fart,
  mom,
  no,
  yes,
}

function Button({ children, sound }) {
  const sfxRef = useRef(null)

  useEffect(() => {
    sfxRef.current = new Audio(sfx[sound])
    sfxRef.current.load()
  }, [ sound ])

  return (
    <button onClick={() => sfxRef.current.play()} className={styles.Button}>
      {children}
    </button>
  )
}

export default Button
