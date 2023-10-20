import { observable, action, makeObservable } from 'mobx'
import { message, Modal } from 'antd'
import { ArgsProps } from 'antd/es/message'
import Utils, { SYSTEM, KEY } from '@/utils'

import ZH from '@/utils/locales/zh'
import EN from '@/utils/locales/en'

export enum ECrudType {
  add = 'add',
  delete = 'delete',
  edit = 'edit',
  search = 'search',
}

export enum EBusiness {
  client,
  category,
  underwriter,
  subUnderwriter,
}

export interface IStateProps {
  key: string
  data: any
}

class BaseStore {
  constructor() {
    makeObservable(this)
  }

  @observable lang: string = 'zh'
  @observable confirm: any = Modal.confirm
  @observable showConfig: boolean = false // 附件
  @observable showGlobalModal: boolean = false // 全局modal 显示影藏
  @observable formRef: any = null // 全局modal form

  /**
   * 修改state中的值
   * @param property
   * @param value
   */
  @action
  setProperty = ({ key = '', data = '' }: IStateProps) => {
    // @ts-ignore
    this[key] = data
  }

  /**
   * 全局提示成功状态
   */
  @action
  globalSuccess = (config: ArgsProps) => {
    message.open({ type: 'success', ...config })
  }

  /**
   * 全局提示警告状态
   */
  @action
  globalWarning = (config: ArgsProps) => {
    message.open({ type: 'warning', ...config })
  }

  /**
   * 全局提示失败状态
   */
  @action
  globalError = (config: ArgsProps) => {
    message.open({ type: 'error', ...config })
  }

  /**
   * 全局提示通知状态
   */
  @action
  globalInfo = (config: ArgsProps) => {
    message.open({ type: 'info', ...config })
  }

  /**
   * 获取当前语言
   * @returns string
   */
  getLanguage = () => {
    return this.lang || Utils.getLocal(KEY.LANGUAGE) || ''
  }

  /**
   * 获取用户id
   * @returns string
   */
  getUserId = () => {
    return Utils.getLocal(KEY.USERID) || ''
  }

  /**
   * 中英文文案获取
   */
  @action
  getLanguageMess = (keyName: string) => {
    if (!keyName) return ''
    let language = Utils.getLocal(KEY.LANGUAGE)
    if (language === SYSTEM.LANGUAGE[0]) {
      //@ts-ignore
      return ZH[keyName] || ''
    }
    if (language === SYSTEM.LANGUAGE[1]) {
      //@ts-ignore
      return EN[keyName] || ''
    }
  }

  /**
   * 获取码表下拉菜单列表（表格表单）
   */
  /*@action
  getCodeType = (type: string) => {
    return new Promise((resolve, reject) => {
      queryCodeTypeApi({ codeType: type }).then((res: any) => {
        if (res.success !== 't') return
        let data = {}
        // 获取渠道下拉数据
        res?.result?.forEach((item: any) => {
          // @ts-ignore
          return (data[item.code] = {
            text: item.name,
          })
        })
        resolve({ formSelect: data, selectList: res?.result })
      })
    })
  }*/

  /**
   * 数组去空
   * @param array
   * @returns
   */
  @action
  TrimSpace(array: any) {
    for (let i = 0; i < array.length; i++) {
      if (
        array[i] === '' ||
        typeof array[i] == 'undefined' ||
        array[i] === undefined ||
        array[i] === null
      ) {
        array.splice(i, 1)
        i = i - 1
      }
    }
    return array
  }

  /**
   * 处理时间格式
   */
  @action
  date = (time: any) => {
    return `${new Date(time).toLocaleDateString()} ${new Date(time).toLocaleTimeString()}`
  }

  /**
   * 补零函数
   */
  @action
  zeroFill = (num: number) => {
    return Number(num) < 10 ? '0' + num : num
  }
}

export default BaseStore
