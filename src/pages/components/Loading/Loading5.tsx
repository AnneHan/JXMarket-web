import  React from 'react'
import './loading.scss'
import { LoadingProps } from './type'
import classNames from 'classnames'

const Loading:React.FC<LoadingProps> = (props: LoadingProps) => {
  const { className } = props

  return (
    <div className={classNames('flex-center loading_5', className)}>
      <div className="colorfulPulse">
        <span className="item-1"></span>
        <span className="item-2"></span>
        <span className="item-3"></span>
        <span className="item-4"></span>
        <span className="item-5"></span>
        <span className="item-6"></span>
        <span className="item-7"></span>
      </div>
    </div>
  )
}

export default Loading
