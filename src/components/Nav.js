import React from 'react'
import styles from './Nav.module.scss'

import { IoIosArrowRoundBack } from 'react-icons/io'
import { IoIosArrowRoundForward } from 'react-icons/io'

function Nav({ position, backHandler, nextHandler, size }) {
  return (
    <nav className={styles.Nav} data-size={size}>
      <button data-position={position} onClick={backHandler}><IoIosArrowRoundBack /></button>
      <button data-position={position} onClick={nextHandler}><IoIosArrowRoundForward /></button>
    </nav>
  )
}

export default Nav
