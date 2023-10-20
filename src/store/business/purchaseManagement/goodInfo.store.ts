import { action, makeObservable, observable } from 'mobx'
import BaseStore, { ECrudType } from '../../base.store'
import { getGoodInfoApi, delGoodInfoApi, updateGoodInfoApi } from '@/utils/http/api'
import { ActionType } from '@ant-design/pro-table'
import CommonStore from '@/store/common.store'
import ROUTER from '@/router/constant'

export type GoodInfoItemType = {
  id: number
  name: string
  category: string
  model: string
  unit: string
  costPrice: string
  retailPrice: string
  expiryDate: string
  barCode: string
  supplierId: string
  supplierName: string
  warnValue: string
  shelfNumber: string
  innerWarnValue: string
  notes: string
  status: boolean
  delFlag: boolean
  updateTime: string
  createTime: string
  quantity: number
}

class RestrictList extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }

  @observable goodInfoData: GoodInfoItemType | null = null //编辑项数据
  @observable actionRef: ActionType | null = null // 绑定dom
  @observable sourceType: string = ''

  /**
   * 获取数据
   * @param params
   * @returns
   */
  @action
  getGoodInfo = (params: { pages: number; pageSize: number }) => {
    return getGoodInfoApi(params)
  }

  /**
   * 删除
   * @param id
   * @param action
   */
  @action
  delGoodInfo = (id: number, action: any) => {
    if (!id) return
    delGoodInfoApi({ id: id }).then((res: any) => {
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
      this.goodInfoData = record
      CommonStore.push(ROUTER.GOODINFOEDIT, { type: ECrudType.edit })
    } else {
      this.goodInfoData = null
      CommonStore.push(ROUTER.GOODINFOEDIT, { type: ECrudType.add })
    }
  }

  /**
   * 提交
   */
  @action
  submitEdit = (value: any) => {
    let params = Object.assign(value)

    if (this.goodInfoData) params = Object.assign(this.goodInfoData, value)

    updateGoodInfoApi(params).then((res: any) => {
      if (res?.success === 't') {
        CommonStore.back()
        this.globalSuccess({ content: this.goodInfoData ? '修改成功' : '添加成功' })
        this.goodInfoData = null
      }
    })
  }
}

const sestrictList = new RestrictList()
export default sestrictList
