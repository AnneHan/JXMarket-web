import { action, makeObservable, observable } from 'mobx'
import BaseStore, { ECrudType } from '../../base.store'
import { getSupplierManagementApi, delSupplierManagementApi, updateSupplierManagementApi } from '@api/api'
import { ActionType } from '@ant-design/pro-table'
import CommonStore from '@/store/common.store'
import ROUTER from '@/router/constant'

export type SupplierManagementItemType = {
  id: number
  name: string
  contactPer: string
  email: string
  tel: string
  fax: string
  address: string
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

  @observable supplierManagementData: SupplierManagementItemType | null = null //编辑项数据
  @observable actionRef: ActionType | null = null // 绑定dom
  @observable sourceType: string = ''

  /**
   * 获取数据
   * @param params
   * @returns
   */
  @action
  getSupplierManagement = (params: { pages: number; pageSize: number }) => {
    return getSupplierManagementApi(params)
  }

  /**
   * 删除
   * @param id
   * @param action
   */
  @action
  delSupplierManagement = (id: number, action: any) => {
    if (!id) return
    delSupplierManagementApi({ id: id }).then((res: any) => {
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
      this.supplierManagementData = record
      CommonStore.push(ROUTER.SUPPLIERMANAGEMENTEDIT, { type: ECrudType.edit })
    } else {
      this.supplierManagementData = null
      CommonStore.push(ROUTER.SUPPLIERMANAGEMENTEDIT, { type: ECrudType.add })
    }
  }

  /**
   * 提交
   */
  @action
  submitEdit = (value: any) => {
    let params = Object.assign(value)

    if (this.supplierManagementData) params = Object.assign(this.supplierManagementData, value)

    updateSupplierManagementApi(params).then((res: any) => {
      if (res?.success === 't') {
        CommonStore.back()
        this.globalSuccess({ content: this.supplierManagementData ? '修改成功' : '添加成功' })
        this.supplierManagementData = null
      }
    })
  }
}

const sestrictList = new RestrictList()
export default sestrictList
