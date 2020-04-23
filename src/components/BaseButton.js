import React, { useState } from 'react'
import styles from './BaseButton.module.scss'

function BaseButton({ onTap, backgroundColor, children }) {
  const [ active, setActive ] = useState(false)

  const tapHandler = () => {
    setActive(true)
    onTap()
  }

  // @todo - iOS chrome will not speak onPointerDown, etc; must be onClick
  return (
    <button
      className={styles.BaseButton}
      style={backgroundColor ? { backgroundColor } : null}
      data-active={active}
      onPointerDown={tapHandler}
      onPointerUp={() => setActive(false)}
      onPointerCancel={() => setActive(false)}
    >
      {children}
    </button>
  )
}

export default BaseButton
