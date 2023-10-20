import { action, makeObservable, observable } from 'mobx'
import BaseStore, { ECrudType } from '../../base.store'
import { getPurchaseInfoApi, delPurchaseInfoApi, updatePurchaseInfoApi } from '@/utils/http/api'
import { ActionType } from '@ant-design/pro-table'
import CommonStore from '@/store/common.store'
import ROUTER from '@/router/constant'

export type PurchaseInfoItemType = {
  id: number
  supplierId: string
  supplierName: string
  deportId: string
  purchaseDate: string
  amount: string
  payMethod: string
  payStatus: string
  notes: string
  status: boolean
  delFlag: boolean
  updateTime: string
  createTime: string
  createBy: string
}

class RestrictList extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }

  @observable purchaseInfoData: PurchaseInfoItemType | null = null //编辑项数据
  @observable actionRef: ActionType | null = null // 绑定dom
  @observable sourceType: string = ''

  /**
   * 获取数据
   * @param params
   * @returns
   */
  @action
  getPurchaseInfo = (params: { pages: number; pageSize: number }) => {
    return getPurchaseInfoApi(params)
  }

  /**
   * 删除
   * @param id
   * @param action
   */
  @action
  delPurchaseInfo = (id: number, action: any) => {
    if (!id) return
    delPurchaseInfoApi({ id: id }).then((res: any) => {
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
      this.purchaseInfoData = record
      CommonStore.push(ROUTER.PURCHASEINFOEDIT, { type: ECrudType.edit })
    } else {
      this.purchaseInfoData = null
      CommonStore.push(ROUTER.PURCHASEINFOEDIT, { type: ECrudType.add })
    }
  }

  /**
   * 提交
   */
  @action
  submitEdit = (value: any) => {
    let params = Object.assign(value)

    if (this.purchaseInfoData) params = Object.assign(this.purchaseInfoData, value)

    updatePurchaseInfoApi(params).then((res: any) => {
      if (res?.success === 't') {
        CommonStore.back()
        this.globalSuccess({ content: this.purchaseInfoData ? '修改成功' : '添加成功' })
        this.purchaseInfoData = null
      }
    })
  }
}

const sestrictList = new RestrictList()
export default sestrictList
