import { action, makeObservable, observable } from 'mobx'
import BaseStore from '../base.store'
import {
  getCodeTypeApi,
  codeTypeDetailApi,
  delCodeTypeApi,
  addCodeTypeApi,
  updCodeTypeApi,
} from '@/utils/http/api'
import CommonStore from '../common.store'
import ROUTER from '@/router/constant'
import commonStore from '../common.store'

export type DictItemType = {
  acskey: number
  code: string
  codename: string
  codetype: string
  codetypename: string
  ecodename: string
}

class DictStore extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }

  @observable dictData: DictItemType = null // 数据
  @observable detailData: DictItemType = null // 详情
  @observable form: any = {} // 操作form dom
  @observable visible: boolean = false
  @observable ref: any = null

  /**
   * 获取数据
   * @param params
   * @returns
   */
  @action
  getDictList = (params: { pages: number; pageSize: number }) => {
    return getCodeTypeApi(params)
  }

  /**
   * 获取详情数据
   * @param params
   * @returns
   */
  @action
  getDictDetailList = (params: { pages: number; pageSize: number }) => {
    return codeTypeDetailApi(params)
  }

  /**
   * 删除
   * @param data
   * @param action
   */
  @action
  delCodeType = (data: DictItemType, action: any) => {
    if (!data.acskey) return
    delCodeTypeApi({
      idList: [String(data.acskey)],
    }).then((res: any) => {
      if (res?.success === 't') {
        action?.reload()
        this.globalSuccess({ content: '删除成功' })
      }
    })
  }

  /**
   * 点击编辑/新增
   */
  @action
  showEdit = async (action: any, record?: DictItemType) => {
    if (record) {
      this.dictData = record
    } else {
      this.dictData = null
    }
    this.ref = action
    this.visible = true
  }

  /**
   * 提交
   */
  @action
  submitEdit = (values: any) => {
    let params = Object.assign({}, this.dictData, values)

    if (!this.dictData) {
      addCodeTypeApi({
        ...params,
        addflag: this.detailData?.codetype ? false : true,
      }).then((res: any) => {
        if (res?.success === 't') {
          this.visible = false
          this.ref.reload()
          this.globalSuccess({ content: '添加成功' })
          this.dictData = null
        }
      })
    } else {
      params = {
        acskey: params?.acskey,
        code: params?.code,
        codename: params?.codename,
        codetype: params?.codetype,
        codetypename: params?.codetypename,
        ecodename: params?.ecodename,
      }
      updCodeTypeApi(params).then((res: any) => {
        if (res?.success === 't') {
          this.visible = false
          this.ref.reload()
          this.globalSuccess({ content: '修改成功' })
          this.dictData = null
        }
      })
    }
  }
  @action
  toDetail = (record: any) => {
    this.detailData = record
    CommonStore.push(ROUTER.DICTDETAIL, {
      codetype: record?.codetype,
      codetypename: record?.codetypename,
    })
  }

  @action
  goBock = () => {
    this.detailData = null
    commonStore.back()
  }
}

const dictStore = new DictStore()
export default dictStore
