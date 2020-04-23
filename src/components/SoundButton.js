import React, { useEffect, useCallback, useRef } from 'react'

import bite from '../assets/sounds/bite.mp3'
import buzzer from '../assets/sounds/buzzer.mp3'
import doorbell from '../assets/sounds/doorbell.mp3'
import fart from '../assets/sounds/fart.mp3'
import mom from '../assets/sounds/mom.wav'
import no from '../assets/sounds/no.wav'
import yes from '../assets/sounds/yes.wav'

import BaseButton from './BaseButton'

const sfx = {
  bite,
  buzzer,
  doorbell,
  fart,
  mom,
  no,
  yes,
}

function SoundButton({ sound, backgroundColor, children }) {
  const sfxRef = useRef(null)

  useEffect(() => {
    sfxRef.current = new Audio(sfx[sound])
    sfxRef.current.load()
  }, [ sound ])

  const handleTap = useCallback(() => {
    sfxRef.current.play()
  }, [])

  return (
    <BaseButton
      backgroundColor={backgroundColor}
      onTap={handleTap}
    >
      {children}
    </BaseButton>
  )
}

export default SoundButton
