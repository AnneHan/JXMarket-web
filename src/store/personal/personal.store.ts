import { observable, makeObservable, action } from 'mobx'
import BaseStore from '../base.store'
import { updatePasswordApi, updateUserListApi } from '@/utils/http/api'
import Utils, { KEY } from '@/utils'
import layoutStore from '../layout/layout.store'

class PersonalStore extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }
  @observable avater: string = '' // 头像存储

  /**
   * 修改密码
   * @param values
   */
  @action
  submitEdit = (values: any) => {
    let params = {
      id: Utils.getLocal(KEY.USERINFO).id,
      oldPassword: Utils.encrypt(Utils.encryptAES(values.oldPassword, false)),
      password: Utils.encrypt(Utils.encryptAES(values.password, false)),
      passwordRepeat: Utils.encrypt(Utils.encryptAES(values.passwordRepeat, false)),
    }

    updatePasswordApi(params).then(res => {
      //@ts-ignore
      if (res?.success === 't') {
        this.globalSuccess({ content: '修改成功' })
      }
    })
  }

  /**
   * 修改用户信息
   * @param values
   */
  @action
  submitInfoEdit = (values: any) => {
    const data = Object.assign(Utils.getLocal(KEY.USERINFO), values)

    let params = {
      avatar: data?.avatar || '',
      personCenter: 'personCenter',
      username: data?.username || '',
      email: data?.email || '',
      phone: data?.phone || '',
      id: data?.id || '',
      status: '1',
      sex: data?.sex === null ? '' : data?.sex,
      personalDescription: data.personalDescription,
    }

    updateUserListApi(params).then(res => {
      Utils.setLocal(KEY.USERINFO, params)
      this.globalSuccess({ content: '修改成功' })
    })
  }

  /**
   * 上传并更换头像
   * @param res
   */
  @action
  uploadAvater = (res: any) => {
    if (!res[0].value?.riderPath) return
    updateUserListApi({
      id: Utils.getLocal(KEY.USERINFO)?.id,
      avatar: res[0].value.riderPath,
      personCenter: 'avatar',
    }).then(() => {
      this.avater = res[0].value.riderPath
      layoutStore.getMenu()
      this.globalSuccess({ content: '头像更换成功' })
    })
  }
}

export default new PersonalStore()
