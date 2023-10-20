import React from 'react'
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
import { observer } from '@/store/index'
import './index.scss'

import LoginForm from './form'

const LoginPage: React.FC<IRouterProps> = (props:IRouterProps): React.ReactElement => {
  const intl = useIntl()
  return (
    <>
    <Helmet title={intl.formatMessage({ id: "10012" }) /* 登录 */} />
    <div className="login_wrap flex-center">
      <div className="bg"></div>
      <div className="content flex">
        <div className="content_left flex-center flex-1">
          <div className="input_wrap">
            <h3>{props.$intl({ id: '10013' })/* XXX管理系统 */}</h3>
            <LoginForm {...props} />
          </div>
        </div>
        <div className="content_right flex-1"></div>
      </div>
    </div></>
  )
}

export default observer(LoginPage)
