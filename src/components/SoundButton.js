import React, { useEffect, useState, useRef } from 'react'
import styles from './SoundButton.module.scss'

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

function SoundButton({ children, sound, backgroundColor }) {
  const [ active, setActive ] = useState(false)

  const sfxRef = useRef(null)

  useEffect(() => {
    sfxRef.current = new Audio(sfx[sound])
    sfxRef.current.load()
  }, [ sound ])

  const handleTouchStart = () => {
    setActive(true)
    sfxRef.current.play()
  }

  return (
    <button
      className={styles.SoundButton}
      style={backgroundColor ? { backgroundColor } : null}
      data-active={active}
      onPointerDown={handleTouchStart}
      onPointerUp={() => setActive(false)}
      onPointerCancel={() => setActive(false)}
    >
      {children}
    </button>
  )
}

export default SoundButton
