import React, { useEffect, useState, useRef, useCallback } from 'react'
import styles from './SpeechButton.module.scss'

let speech = null
let voices = null

if ('speechSynthesis' in window) {
  speech = window.speechSynthesis
} else {
  console.log('text-to-speech not supported')
}

// cross-browser get array of speech synthesis voices
function getVoices() {
  return new Promise(resolve => {
    let vs = speechSynthesis.getVoices()

    if (vs.length) {
      resolve(vs)
      return
    }

    // chrome fires an event when voices ready
    speech.onvoiceschanged = () => {
      vs = speechSynthesis.getVoices()
      resolve(vs)
    }
  })
}

// choose iOS voice samantha if available; otherwise default to first en-US voice
async function chooseVoice() {
  if (!voices) {
    voices = (await getVoices()).filter(voice => voice.lang === 'en-US')
  }

  const samantha = voices.filter(voice => voice.name === 'Samantha')

  return new Promise(resolve => {
    if (samantha.length) {
      resolve(samantha[0])
    }
    resolve(voices[0])
  })
}

function SpeechButton({ children, say, backgroundColor }) {
  const [ active, setActive ] = useState(false)

  const voiceRef = useRef(null)

  useEffect(() => {
    const vv = async () => {
      voiceRef.current = await chooseVoice()
    }
    vv()
  }, [])

  const speak = useCallback((phrase) => {
    if (!speech) {
      return
    }

    const utterance = new SpeechSynthesisUtterance(phrase)
    utterance.voice = voiceRef.current
    speech.speak(utterance)
  }, [])

  /*
  const handleTouchStart = () => {
    setActive(true)
    speak(say)
  }
  */

  // @todo - change back to onTouchStart after Android tablet purchased; iOS won't speak
  return (
    <button
      className={styles.SpeechButton}
      style={backgroundColor ? { backgroundColor } : null}
      data-active={active}
      onClick={() => speak(say)}
      // onPointerDown={handleTouchStart}
      onPointerUp={() => setActive(false)}
      onPointerCancel={() => setActive(false)}
    >
      {children}
    </button>
  )
}

export default SpeechButton
