import { action, observable, makeObservable } from 'mobx'
import {
  delRoleListApi,
  getRoleListApi,
  queryByTypeMenuApi,
  roleMenuApi,
  saveRoleListApi,
  updateByRoleIdMenuApi,
  updateRoleListApi,
} from '@/utils/http/api'
import BaseStore from '../base.store'
import layoutStore from '../layout/layout.store'
import menuManagement from './menuManagement.store'

export type RoleListItem = {
  description: string
  id: string
  roleCode: string
  roleName: string
}

class RoleStore extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }
  @observable visible: boolean = false // 弹窗
  @observable modalData: RoleListItem | null = null // 详情数据
  @observable showTreeFlag: boolean = false // 权限弹窗
  @observable ref: any = {} // ref
  @observable roleId: string = '' // 角色id

  /**
   * 获取数据
   * @param params
   * @returns
   */
  @action
  getRoleList = (params: any) => {
    return getRoleListApi(params)
  }

  /**
   * 删除角色
   * @param id
   */
  @action
  delRoleEntity = (id: string, action: any) => {
    if (!id) return
    delRoleListApi({ id }).then((res: any) => {
      if (res?.success === 't') {
        action?.reload()
        this.globalSuccess({ content: '删除成功' })
      }
    })
  }

  /**
   * 编辑
   * @param record
   * @param action
   */
  @action
  setRolesList = (action: any, record?: RoleListItem) => {
    if (record) {
      this.modalData = record
    } else {
      this.modalData = null
    }
    this.ref = action
    this.visible = true
  }

  /**
   * 提交
   */
  @action
  submitEdit = (data: IObjectProps) => {
    if (!this.modalData) {
      saveRoleListApi(data).then((res: any) => {
        if (res?.success === 't') {
          this.globalSuccess({ content: '添加成功' })
        }
      })
    } else {
      let params = Object.assign(this.modalData, data)
      updateRoleListApi(params).then((res: any) => {
        if (res?.success === 't') {
          this.globalSuccess({ content: '修改成功' })
        }
      })
    }
    this.handleCancel()
  }
  /**
   * 关闭参数
   */
  @action
  handleCancel = () => {
    this.ref?.reload()
    this.modalData = null
    this.visible = false
  }
  /**
   * 开启菜单权限弹窗
   */
  @action
  setShowTreeFlag = async (params: RoleListItem) => {
    menuManagement.menuList()
    this.modalData = params
    this.roleId = params.id
    roleMenuApi({ id: params.id }).then(res => {
      let arr: any[] = []
      //@ts-ignore
      if (res.success === 't' && res.result) {
        //@ts-ignore
        res.result.forEach(item => {
          arr.push(item.id)

          if (item.child.length) {
            item.child.forEach((val: any) => {
              arr.push(val.id)
            })
          }
        })
      }
      menuManagement.checkedKeys = arr
    })
    this.showTreeFlag = true
  }

  /**
   * 关闭弹窗
   */
  @action
  closeShowFlag = () => {
    this.showTreeFlag = false
  }

  /**
   * 提交
   */
  @action
  submitTree = () => {
    if (menuManagement.checkedNodes) {
      if (!this.findOne(this.TrimSpace(menuManagement.halfCheckedKeys), this.checkedNode())) {
        this.tips()

        return
      }
    }

    updateByRoleIdMenuApi({
      roleId: this.roleId,
      persissionArrays:
        (this.TrimSpace(menuManagement.halfCheckedKeys).length &&
          this.TrimSpace(menuManagement.halfCheckedKeys)) ||
        menuManagement.checkedKeys,
    }).then((res: any) => {
      if (res?.success === 't') {
        layoutStore.getMenu()
        this.showTreeFlag = false
        this.globalSuccess({ content: '权限修改成功' })
      }
    })
  }

  @action
  queryByTypeMenu = () => {
    return new Promise((resolve, reject) => {
      queryByTypeMenuApi({ type: '0' }).then((res: any) => {
        if (res?.success === 't') {
          resolve(res.result)
        }
      })
    })
  }

  @action
  tips = async () => {
    let id = this.checkedNode().filter(
      (item: any) => !this.TrimSpace(menuManagement.halfCheckedKeys).includes(item)
    )
    let parent: any = await this.queryByTypeMenu()
    let unselected = parent
      ?.filter((item: any) => id.includes(item.id))
      ?.map((item: any) => item.name)
    this.globalWarning({ content: `请选中一级菜单${unselected}` })
  }

  @action
  checkedNode = () => {
    let data = menuManagement.checkedNodes.map((item: any) => {
      return item.parentId
    })
    return this.TrimSpace(Array.from(new Set(data)))
  }

  @action
  findOne = (a: any, b: any) => {
    // a和b其中一个不是数组，直接返回false
    if (!(a instanceof Array) || !(b instanceof Array)) return false
    const len = b.length
    // a的长度小于b的长度，直接返回false
    if (a.length < len) return false
    for (let i = 0; i < len; i++) {
      // 遍历b中的元素，遇到a没有包含某个元素的，直接返回false
      if (!a.includes(b[i])) return false
    }
    // 遍历结束，返回true
    return true
  }
}

const roleStore = new RoleStore()
export default roleStore
