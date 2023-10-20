import { action, makeObservable, observable } from 'mobx'
import BaseStore, { ECrudType } from '../../base.store'
import { getGoodInventoryApi, delGoodInventoryApi, updateGoodInventoryApi } from '@/utils/http/api'
import { ActionType } from '@ant-design/pro-table'
import CommonStore from '@/store/common.store'
import ROUTER from '@/router/constant'

export type GoodInventoryItemType = {
  id: number
  quantity: number
  innerQuantity: number
  goodId: string
  goodName: string
  updateTime: string
  createTime: string
}

class RestrictList extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }

  @observable goodInventoryData: GoodInventoryItemType | null = null //编辑项数据
  @observable actionRef: ActionType | null = null // 绑定dom
  @observable sourceType: string = ''

  /**
   * 获取数据
   * @param params
   * @returns
   */
  @action
  getGoodInventory = (params: { pages: number; pageSize: number }) => {
    return getGoodInventoryApi(params)
  }

  /**
   * 删除
   * @param id
   * @param action
   */
  @action
  delGoodInventory = (id: number, action: any) => {
    if (!id) return
    delGoodInventoryApi({ id: id }).then((res: any) => {
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
      this.goodInventoryData = record
      CommonStore.push(ROUTER.GOODINVENTORYEDIT, { type: ECrudType.edit })
    } else {
      this.goodInventoryData = null
      CommonStore.push(ROUTER.GOODINVENTORYEDIT, { type: ECrudType.add })
    }
  }

  /**
   * 提交
   */
  @action
  submitEdit = (value: any) => {
    let params = Object.assign(value)

    if (this.goodInventoryData) params = Object.assign(this.goodInventoryData, value)

    updateGoodInventoryApi(params).then((res: any) => {
      if (res?.success === 't') {
        CommonStore.back()
        this.globalSuccess({ content: this.goodInventoryData ? '修改成功' : '添加成功' })
        this.goodInventoryData = null
      }
    })
  }
}

const sestrictList = new RestrictList()
export default sestrictList
