import React from 'react'
import styles from './GridLayout.module.scss'

function GridLayout({ children }) {
  if (React.Children.count(children) !== 4) {
    throw new Error('GridLayout expects 4 children')
  }

  return (
    <div className={styles.GridLayout}>
      {React.Children.map(children, (child, i) => {
        return (
          <div className="item" key={i}>
            {child}
          </div>
        )
      })}
    </div>
  )
}

export default GridLayout
