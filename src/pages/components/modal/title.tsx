import React from 'react'
import Icon from '@/assets/svg'

interface ITitleProps {
  title?: string | unknown
  disabled: boolean // 是否可以拖动
  setDisabled: (data: boolean) => any // 设置是否允许拖动
  full: boolean // 全屏状态
  setFull: (data: boolean) => any
}

/**
 * 封装modal title
 */
const Title: React.FC<ITitleProps> = ({ title, disabled, full, setFull, setDisabled }) => {
  const handleSetFull = () => {
    setFull(!full)
    // 全屏状态关闭拖动
    setDisabled(true)
  }
  return (
    <div
      className="hyl-modal-header-title flex flex-jsc-between flex-align-center"
      style={{
        width: '100%',
        cursor: full ? 'unset' : 'move',
      }}
      onMouseOver={() => {
        if (disabled) {
          setDisabled(false)
        }
      }}
      onMouseOut={() => {
        setDisabled(true)
      }}
      onFocus={() => {}}
      onBlur={() => {}}
    >
      <>
        {title || '这是title'}
        {/* 全屏处理 icon */}
        {!full && <Icon name="full" onClick={handleSetFull} className="cursor-pointer" />}
        {full && <Icon name="full2" onClick={handleSetFull} className="cursor-pointer" />}
      </>
    </div>
  )
}

export default React.memo(Title)
