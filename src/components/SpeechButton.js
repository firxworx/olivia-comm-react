import React, { useEffect, useRef, useCallback } from 'react'

import BaseButton from './BaseButton'

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

function SpeechButton({ say, backgroundColor, children }) {
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

  return (
    <BaseButton
      backgroundColor={backgroundColor}
      onTap={() => speak(say)}
    >
      {children}
    </BaseButton>
  )
}

export default SpeechButton
