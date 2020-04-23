import React, { useState } from 'react'
import styles from './BaseButton.module.scss'

function BaseButton({ children }) {
  const [ active, setActive ] = useState(false)

  return (
    <button
      className={styles.BaseButton}
      data-active={active}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
      onTouchCancel={() => setActive(false)}
    >
      {children}
    </button>
  )
}

export default BaseButton
