import React, { useState } from 'react'
import copy from 'copy-to-clipboard'
import Icon from '@/assets/svg'
import styles from './index.module.scss'

const Copy = (props: any) => {
  const [copyName, setCopyName] = useState('copy')

  const copys = (value: any) => {
    if (copy(value)) {
      setCopyName('copySuccess')
      window.setTimeout(() => {
        setCopyName('copy')
      }, 3000)
    }
  }
  return (
    <span
      className={`${styles.cmpcopy} ${copyName === 'copy' ? styles.copy : styles.copySuccess}`}
      onClick={() => copys(props.text)}
    >
      <Icon name={copyName} />
    </span>
  )
}

export default Copy
