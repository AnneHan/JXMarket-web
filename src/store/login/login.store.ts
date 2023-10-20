import { observable, action } from 'mobx'
import ROUTER from '@/router/constant'
import BaseStore from '../base.store'
import { loginApi } from '@/utils/http/api'
import Utils, { SYSTEM, KEY } from '@/utils'

interface ILoginParamsType {
  username: string
  password: string
  remember?: boolean
}

class LoginStore extends BaseStore {
  @observable params: ILoginParamsType = {
    username: '',
    password: '',
  }
  @observable remember: boolean = false // 记住密码

  /**
   *初始化 账号和密码
   */
  @action
  initAccountHandle = (setFieldsValue: CallableFunction) => {
    const remmember = Utils.getLocal(KEY.REMEMBER)
    if (!remmember || remmember !== true) return

    const params = Utils.getLocal(KEY.ACCOUNT)
    if (!params) return

    setFieldsValue(params)
    this.params = {
      username: params.username,
      password: params.password,
    }
  }

  /**
   * 记住密码
   * @param values
   */
  @action
  rememberHandle = (values: ILoginParamsType) => {
    // 记住密码
    if (values.remember) {
      this.remember = values.remember
      Utils.setLocal(KEY.ACCOUNT, values)
      Utils.setLocal(KEY.REMEMBER, this.remember)
    } else if (values.remember === false && Utils.getLocal(KEY.ACCOUNT)) {
      Utils.removeLocal(KEY.ACCOUNT)
      Utils.removeLocal(KEY.REMEMBER)
    }
  }

  /**
   * 登录
   */
  @action
  onFinish = (values: ILoginParamsType, props: IRouterProps) => {
    let params = {
      username: values.username,
      password: Utils.encrypt(Utils.encryptAES(values.password, false)),
    }
    this.rememberHandle(values)

    loginApi(params).then(
      action((res: any) => {
        if (res && res.success === SYSTEM.SUCCESS) {
          Utils.setLocal(KEY.TOKEN, res.result.token)
          Utils.setLocal(KEY.USERID, res.result.id)
          props.history.replace(ROUTER.MONITOR)
        }
      })
    )
  }
}

export default new LoginStore()
