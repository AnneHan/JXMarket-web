import React from 'react'
import { useStore, observer } from '@/store/index'


/**
 * 国际化tool
 */
const GlobalizationTool: React.FC = (): React.ReactElement => {
  const { layoutStore } = useStore()
  const { changeLang } = layoutStore

  return (
    <div className="select-dropdown">
      <ul className="dropdown-menu">
        <li className="dropdown-item dropdown-item-selected" onClick={() => changeLang('zh')}>
          <span>简体中文</span>
        </li>
        <li className="dropdown-item" onClick={() => changeLang('en')}>
          <span>English</span>
        </li>
      </ul>
    </div>
  )
}

export default observer(GlobalizationTool)
