import React, { useState } from 'react'
import styles from './Nav.module.scss'

import { IoIosArrowRoundBack } from 'react-icons/io'
import { IoIosArrowRoundForward } from 'react-icons/io'

function Nav({ position, backHandler, nextHandler, size }) {
  const [ backActive, setBackActive ] = useState(false)
  const [ nextActive, setNextActive ] = useState(false)

  return (
    <nav className={styles.Nav} data-size={size}>
      <button
        data-position={position}
        data-active={backActive}
        onClick={backHandler}
        onTouchStart={() => setBackActive(true)}
        onTouchEnd={() => setBackActive(false)}
        onTouchCancel={() => setBackActive(false)}
      >
        <IoIosArrowRoundBack />
      </button>
      <button
        data-position={position}
        data-active={nextActive}
        onClick={nextHandler}
        onTouchStart={() => setNextActive(true)}
        onTouchEnd={() => setNextActive(false)}
        onTouchCancel={() => setNextActive(false)}
      >
        <IoIosArrowRoundForward />
      </button>
    </nav>
  )
}

export default Nav
