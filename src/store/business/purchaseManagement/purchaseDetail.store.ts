import { action, makeObservable, observable } from 'mobx'
import BaseStore, { ECrudType } from '../../base.store'
import { getPurchaseDetailApi, delPurchaseDetailApi, updatePurchaseDetailApi } from '@/utils/http/api'
import { ActionType } from '@ant-design/pro-table'
import CommonStore from '@/store/common.store'
import ROUTER from '@/router/constant'

export type PurchaseDetailItemType = {
  id: number
  purchaseId: string
  goodId: string
  goodName: string
  quantity: string
  unitPrice: string
  updateTime: string
  createTime: string
}

class RestrictList extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }

  @observable purchaseDetailData: PurchaseDetailItemType | null = null //编辑项数据
  @observable actionRef: ActionType | null = null // 绑定dom
  @observable sourceType: string = ''

  /**
   * 获取数据
   * @param params
   * @returns
   */
  @action
  getPurchaseDetail = (params: { pages: number; pageSize: number }) => {
    return getPurchaseDetailApi(params)
  }

  /**
   * 删除
   * @param id
   * @param action
   */
  @action
  delPurchaseDetail = (id: number, action: any) => {
    if (!id) return
    delPurchaseDetailApi({ id: id }).then((res: any) => {
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
      this.purchaseDetailData = record
      CommonStore.push(ROUTER.PURCHASEDETAILEDIT, { type: ECrudType.edit })
    } else {
      this.purchaseDetailData = null
      CommonStore.push(ROUTER.PURCHASEDETAILEDIT, { type: ECrudType.add })
    }
  }

  /**
   * 提交
   */
  @action
  submitEdit = (value: any) => {
    let params = Object.assign(value)

    if (this.purchaseDetailData) params = Object.assign(this.purchaseDetailData, value)

    updatePurchaseDetailApi(params).then((res: any) => {
      if (res?.success === 't') {
        CommonStore.back()
        this.globalSuccess({ content: this.purchaseDetailData ? '修改成功' : '添加成功' })
        this.purchaseDetailData = null
      }
    })
  }
}

const sestrictList = new RestrictList()
export default sestrictList
