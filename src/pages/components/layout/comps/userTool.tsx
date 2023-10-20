import React, { useCallback } from 'react'
import { useStore, observer } from '@/store/index'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import ROUTER from '@/router/constant'

/**
 * 用户下拉tool
 */
const UserTool: React.FC = (): React.ReactElement => {
  const history = useHistory()
  const intl = useIntl()
  const { layoutStore } = useStore()
  const { logOut, handleToPresonal } = layoutStore

  const handleLoginOut = useCallback(() => {
    logOut()
    history.push(ROUTER.LOGIN)
  }, []) 

  return (
    <div className="select-dropdown">
      <ul className="dropdown-menu">
        <li className="dropdown-item" onClick={handleToPresonal}>
          <i className="fa fa-user-o m-r-10"></i>
          <span>{intl.formatMessage({ id: 'personalCenter' }) /* 个人中心 */}</span>
        </li>
        {/*<li className="dropdown-item">
          <i className="fa fa-gear m-r-10"></i>
          <span> {intl.formatMessage({ id: 'setUp' }) // 设置 }</span>
        </li>*/}
        <li className="dropdown-item dropdown-item-divided" onClick={handleLoginOut}>
          <i className="fa fa-sign-out  m-r-10"></i>
          <span>{intl.formatMessage({ id: 'logout' }) /* 退出登录 */}</span>
        </li>
      </ul>
    </div>
  )
}

export default observer(UserTool)
