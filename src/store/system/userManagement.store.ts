import { action, observable, makeObservable } from 'mobx'
import { Key } from 'react'
import BaseStore, { ECrudType } from '../base.store'
import {
  delUserListApi,
  getUserListApi,
  infoRoleListApi,
  resetUserListApi,
  saveUserListApi,
  updateUserListApi,
  updateUserStatusApi,
} from '@/utils/http/api'
import CommonStore from '../common.store'
import ROUTER from '@/router/constant'
import Utils from '@/utils'
import layoutStore from '../layout/layout.store'

export type UserItem = {
  avatar: string
  birthday: string
  createTime: string
  delFlag: boolean
  email: string
  id: string
  password: string
  phone: string
  sex: boolean
  status: boolean
  updateTime: string
  username: string
}

class UserStore extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }
  @observable visible: boolean = false // 角色弹窗
  @observable modalData: any = null // 详情数据
  @observable form: any = {} // ref
  @observable roleData: any = null // 角色信息

  @action
  getUserList = (params: any) => {
    return getUserListApi(params)
  }

  @action
  delUserList = (id: any, action: any) => {
    if (!id) return
    delUserListApi({ id: id }).then((res: any) => {
      if (res?.success === 't') {
        action?.reload()
        this.globalSuccess({ content: '删除成功' })
      }
    })
  }
  /**
   * 弹窗 编辑/新增
   */
  showEdit = (record?: any) => {
    if (record) {
      CommonStore.push(ROUTER.USERMANAGEMENTEDIT, { type: ECrudType.edit })
      // 处理图片回显
      const img = {
        uid: '',
        name: 'image.png',
        url: '',
      }
      record.avatar = [Object.assign({}, img, { uid: 'index', url: record.avatar })]

      this.modalData = record
    } else {
      this.modalData = null
      CommonStore.push(ROUTER.USERMANAGEMENTEDIT, { type: ECrudType.add })
    }
  }

  /**
   * 角色弹窗
   */
  @action
  showModal = (form: any) => {
    this.visible = true
    this.roleData = null
    this.form = form
  }

  /**
   * 选择角色
   */
  @action
  handleOk = () => {
    if (this.visible) {
      this.visible = false
      this.form.setFieldsValue({ roleName: this.roleData?.roleName })
    }
  }
  /**
   * 提交
   */
  @action
  submitEdit = (values: any) => {
    if (!this.modalData) {
      let params = {
        ...values,
        avatar: values?.avatar?.url || values?.avatar?.riderPath,
        password: Utils.encrypt(Utils.encryptAES(values.password, false)),
        roleId: this.roleData.id,
      }

      saveUserListApi(params).then((res: any) => {
        if (res?.success === 't') {
          CommonStore.back()
          this.globalSuccess({ content: '添加成功' })
        }
      })
    } else {
      // 合并参数
      let data = Object.assign(this.modalData, values)

      data.avatar =
        values?.avatar[0]?.url ||
        values?.avatar[0]?.riderPath ||
        values?.avatar?.url ||
        values?.avatar?.riderPath
      // 入参
      let params = {
        avatar: data?.avatar || '',
        id: data?.id || '',
        birthday: data?.birthday || '',
        email: data?.email || '',
        phone: data?.phone || '',
        roleName: data?.roleName || '',
        sex: data?.sex === null ? '' : data?.sex,
        status: data?.status,
        username: data?.username === null ? '' : data?.username,
        roleId: this.roleData?.id || this.modalData.role.id,
      }

      updateUserListApi(params).then((res: any) => {
        if (res?.success === 't') {
          CommonStore.back()
          layoutStore.getMenu()
          this.globalSuccess({ content: '修改成功' })
        }
      })
    }
  }

  /**
   * 获取角色选择信息
   * @param ls
   */
  @action
  getRoleId = async (ls: Key[]) => {
    if (!ls[0]) {
      this.roleData = null
      return
    }

    let res: any = await infoRoleListApi({
      id: ls[0],
    })
    if (res?.success === 't') {
      this.roleData = res?.result
    }
  }

  /**
   * 重置密码
   */
  @action
  resetUserList = async (id: string) => {
    let res: any = await resetUserListApi({ id })
    if (res?.success === 't') {
      this.globalSuccess({ content: '密码已重置' })
    }
  }

  /**
   * 冻结状态
   */
  @action
  updateUserStatus = (id: string, action: any, status: boolean) => {
    updateUserStatusApi({ id: id, status: status }).then((res: any) => {
      if (res?.success === 't') {
        action?.reload()
        this.globalSuccess({ content: status ? '解冻成功' : '冻结成功' })
      }
    })
  }
}

const userStore = new UserStore()
export default userStore
