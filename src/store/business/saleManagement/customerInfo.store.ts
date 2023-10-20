import { action, makeObservable, observable } from 'mobx'
import BaseStore, { ECrudType } from '../../base.store'
import { getCustomerInfoApi, delCustomerInfoApi, updateCustomerInfoApi } from '@/utils/http/api'
import { ActionType } from '@ant-design/pro-table'
import CommonStore from '@/store/common.store'
import ROUTER from '@/router/constant'

export type CustomerInfoItemType = {
  id: number
  username: string
  birthday: string
  email: string
  password: string
  tel: string
  address: string
  membership: string
  sex: boolean
  status: boolean
  delFlag: boolean
  updateTime: string
  createTime: string
}

class RestrictList extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }

  @observable customerInfoData: CustomerInfoItemType | null = null //编辑项数据
  @observable actionRef: ActionType | null = null // 绑定dom
  @observable sourceType: string = ''

  /**
   * 获取数据
   * @param params
   * @returns
   */
  @action
  getCustomerInfo = (params: { pages: number; pageSize: number }) => {
    return getCustomerInfoApi(params)
  }

  /**
   * 删除
   * @param id
   * @param action
   */
  @action
  delCustomerInfo = (id: number, action: any) => {
    if (!id) return
    delCustomerInfoApi({ id: id }).then((res: any) => {
      if (res?.success === 't') {
        action?.reload()
        this.globalSuccess({ content: '删除成功' })
      }
    })
  }

  /**
   * 开启弹窗-编辑/新增
   */
  @action
  showEdit = (record?: any) => {
    if (record) {
      this.customerInfoData = record
      CommonStore.push(ROUTER.CUSTOMERINFOEDIT, { type: ECrudType.edit })
    } else {
      this.customerInfoData = null
      CommonStore.push(ROUTER.CUSTOMERINFOEDIT, { type: ECrudType.add })
    }
  }

  /**
   * 提交
   */
  @action
  submitEdit = (value: any) => {
    let params = Object.assign(value)

    if (this.customerInfoData) params = Object.assign(this.customerInfoData, value)

    updateCustomerInfoApi(params).then((res: any) => {
      if (res?.success === 't') {
        CommonStore.back()
        this.globalSuccess({ content: this.customerInfoData ? '修改成功' : '添加成功' })
        this.customerInfoData = null
      }
    })
  }
}

const sestrictList = new RestrictList()
export default sestrictList
