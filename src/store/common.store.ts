import { action, observable, makeObservable } from 'mobx'
import BaseStore from './base.store'

class CommonStore extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }
  @observable history: any | null = null
  @observable copyName: any = 'copy'
  @observable timer: any = null
  /**
   * 初始化history
   * @param history
   * @returns
   */
  @action
  initHistory = (history: unknown) => {
    if (!history) return
    this.history = history
  }

  /**
   * 路由跳转
   * @param path
   * @param state
   */
  @action
  push = (path: any, state?: any) => {
    this.history && this.history.push(path, state)
  }

  /**
   * 路由 replace
   * @param path
   * @param state
   */
  @action
  replace = (path: any, state?: any) => {
    this.history && this.history.replace(path, state)
  }

  /**
   * 返回上一页
   */
  back = () => {
    this.history && this.history.go(-1)
  }
}
const commonStore = new CommonStore()
export default commonStore
