import React, { useEffect, useRef } from 'react'
import styles from './SpeechButton.module.scss'

let speech = null
let voices = null

if ('speechSynthesis' in window) {
  speech = window.speechSynthesis
} else {
  console.log('text-to-speech not supported')
}

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

function SpeechButton({ children, say }) {
  const voiceRef = useRef(null)

  useEffect(() => {
    const vv = async () => {
      voiceRef.current = await chooseVoice()
    }
    vv()
  }, [])

  function speak(phrase) {
    if (!speech) {
      return
    }

    const utterance = new SpeechSynthesisUtterance(phrase)
    utterance.voice = voiceRef.current
    speech.speak(utterance)
  }

  return (
    <button onTouchStart={() => speak(say)} className={styles.SpeechButton}>
      {children}
    </button>
  )
}

export default SpeechButton
