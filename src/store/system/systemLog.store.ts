import { action, makeObservable, observable } from 'mobx'
import BaseStore from '../base.store'
import { getSystemLogApi } from '@/utils/http/api'

export type SystemLogType = {
  createTime: any
  costTime: number
  id: string
  ip: string
  logContent: string
  logType: string
  method: string
  operateType: string
  requestParam: string
  requestType: string
  requestUrl: string
  userid: string
  username: string
}

class SystemLogStore extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }

  @observable info: SystemLogType | null = null
  @observable visible: boolean = false

  /**
   * 获取数据
   * @param params
   * @returns
   */
  @action
  getSystemLog = (params: any) => {
    return getSystemLogApi(params)
  }

  @action
  showInfoModal = (data: SystemLogType) => {
    this.visible = true
    this.info = data
  }

  @action
  closeInfoModal = () => {
    this.info = null
    this.visible = false
  }

  @action
  type = operateType => {
    let name = ''
    switch (operateType) {
      case '0':
        name = '新增或修改'
        break
      case '1':
        name = '新增'
        break
      case '2':
        name = '删除'
        break
      case '3':
        name = '修改'
        break
      case '4':
        name = '查询'
        break
      case '5':
        name = '登录'
        break
      case '6':
        name = '其他'
        break
    }
    return name
  }
}

const systemLogStore = new SystemLogStore()
export default systemLogStore
