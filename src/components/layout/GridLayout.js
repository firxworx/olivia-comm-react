import React from 'react'
import styles from './GridLayout.module.scss'

function GridLayout({ size, children }) {
  if (React.Children.count(children) !== size) {
    throw new Error(`GridLayout expects ${size} children per 'size' prop`)
  }

  return (
    <div className={styles.GridLayout} data-size={size}>
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
