import React, { useState } from 'react'
import Icon from '@/assets/svg'
import styles from './index.module.scss'

interface IPasswordType {
  updateState: (show: boolean) => void
}
const Password = (props: IPasswordType) => {
  const [showPwd, setShowPwd] = useState(false)

  const update = () => {
    props.updateState(!showPwd)
    setShowPwd(!showPwd)
  }

  return (
    <>
      <span className={styles.password} onClick={() => update()}>
        <Icon name={showPwd ? 'showPwd' : 'closePwd'}></Icon>
      </span>
    </>
  )
}

export default Password
