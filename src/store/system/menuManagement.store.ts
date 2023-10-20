import React from 'react'
import { action, observable, makeObservable } from 'mobx'
import BaseStore from '../base.store'
import layoutStore from '../layout/layout.store'
import {
  deleteBatchMenuApi,
  menuListApi,
  queryByTypeMenuApi,
  saveMenuApi,
  searchMenuApi,
  updateMenuApi,
} from '@/utils/http/api'
import Utils, { KEY } from '@/utils'

export interface IMenuParent {
  active: string
  child: []
  height: string
  icon: string
  id: string
  menuType: 0
  name: string
  parentId: string
  sortNo: number
  url: string
}

class MenuStore extends BaseStore {
  constructor() {
    super()
    makeObservable(this)
  }
  @observable visible: boolean = false //弹窗开关
  @observable treeData: any = [] // 菜单管理数据
  @observable checkedKeys: React.Key[] = [] // 已选中的数据
  @observable expandedKeys: React.Key[] = [] // 展开指定的树节点
  @observable selectedKeys: React.Key[] = [] //设置选中的树节点
  @observable menuDataItem: any = {} // 点击项的数据
  @observable typeNum: number = null // 父子菜单类型
  @observable parent: any = [] // 父级数据
  @observable ref: any = {} // 操作dom
  @observable delVisible: boolean = false // 批量删除二次提醒
  @observable timer: any = null // 定时器
  @observable num: number = 0 //延时时间
  @observable loading: boolean = false // loading
  @observable halfCheckedKeys: React.Key[] = [] // 未选择的菜单选项
  @observable checkedNodes: React.Key[] = [] // 未选择的菜单选项

  @action
  menuList = async () => {
    let res = await menuListApi({})
    //@ts-ignore
    this.treeData = this.modifyData(res.result)
    Utils.setLocal(KEY.MENU, this.treeData)
    this.getParentMenu()
    this.onExpandAll()
    this.onCheckClose()
  }

  /**
   * 复选框
   */
  @action
  onCheck = (checkedKeysValue: any, e: any) => {
    this.checkedKeys = checkedKeysValue?.checked || checkedKeysValue
    this.halfCheckedKeys =
      checkedKeysValue?.checked?.concat(e.halfCheckedKeys) ||
      checkedKeysValue?.concat(e.halfCheckedKeys)

    this.checkedNodes = e?.checkedNodes
  }

  /**
   * 批量删除
   */
  @action
  deleteBatch = () => {
    this.delVisible = true
  }

  /**
   * 获取编辑组件form的ref
   * @param ref
   */
  @action
  getFormRef = (ref: any) => {
    this.ref = ref
  }

  /**
   * 全部选中
   */
  @action
  onCheckAll = () => {
    if (this.treeData.length) {
      const expand: any = []
      this.treeData.forEach((item: any) => {
        expand.push(this.deepTraversa(item))
      })
      this.checkedKeys = expand.flat()
      this.onCheck(this.checkedKeys, this.checkedKeys)
    }
  }

  /**
   * 取消选中
   */
  @action
  onCheckClose = () => {
    this.checkedKeys = []
    this.onCheck([], [])
  }

  /**
   * 展开收起节点
   * @param expandedKeysValue
   */
  @action
  onExpand = (expandedKeysValue: React.Key[]) => {
    this.expandedKeys = expandedKeysValue
  }

  /**
   * 点击一项触发
   * @param selectedKeysValue
   * @param info
   */
  @action
  onSelect = async (selectedKeysValue: React.Key[], info: any) => {
    this.selectedKeys = selectedKeysValue
    this.menuDataItem = info.node
    this.typeNum = info.node.menuType
    this.ref && this.ref.setFieldsValue && this.ref.setFieldsValue({ ...info.node })
  }

  /**
   * 获取一级菜单列表
   */
  @action
  getParentMenu = () => {
    queryByTypeMenuApi({ type: '0' }).then((res: any) => {
      if (res?.success === 't') {
        this.parent = res.result
      }
    })
  }

  /**
   * 处理menu数据方法
   * @param node
   * @param nodeList
   * @returns
   */
  @action
  modifyData = (node: any, nodeList: any = []) => {
    if (node != null) {
      nodeList = node.map((item: Menu) => {
        return {
          ...item,
          title: item.name,
          key: item.id,
          children: this.modifyData(item.child),
        }
      })
    }
    return nodeList
  }
  /**
   * 获取数据所有key值
   */
  @action
  deepTraversa = (node: any, nodeList: any = []) => {
    if (node != null) {
      nodeList.push(node.key + '')
      let children = node.children
      if (children) {
        for (let i = 0; i < children.length; i++) {
          this.deepTraversa(children[i], nodeList)
        }
      }
    }
    return nodeList
  }

  /**
   * 全部展开
   */
  @action
  onExpandAll = () => {
    if (this.treeData) {
      const expand: any = []
      this.treeData.forEach((item: any) => {
        expand.push(this.deepTraversa(item))
      })
      this.expandedKeys = expand.flat()
    }
  }

  /**
   * 全部收起
   */
  @action
  onExpandClose = () => {
    this.expandedKeys = []
  }

  /**
   * 搜索菜单
   */
  @action
  menuSearch = (value: string) => {
    if (!value) {
      this.treeData = Utils.getLocal(KEY.MENU)
      this.loading = false
      return
    }
    this.loading = true
    this.debounce(value)
  }

  /**
   * 输入框为空展示全部列表
   * @param e
   */
  @action
  valueNull = (e: any) => {
    if (!e?.target?.value) this.treeData = Utils.getLocal(KEY.MENU)
    this.loading = false
  }

  /**
   * 节流请求
   * @param value
   */
  @action
  debounce = (value: string) => {
    if (this.timer) {
      return
    }

    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      searchMenuApi({
        keyWord: value,
      }).then((res: any) => {
        if (res && res?.success === 't' && res?.result) {
          this.treeData = this.modifyData(res.result)
          this.loading = false
          this.num = 1000
        }
      })
    }, this.num)
  }

  /**
   * 添加菜单，获取所有的父级菜单
   */
  @action
  showModal = () => {
    this.visible = true
  }

  /**
   * 提交修改
   * @param values
   */
  @action
  submitEdit = (values: IMenuParent) => {
    updateMenuApi({ ...values, id: this.selectedKeys[0], parentId: values.parentId || null }).then(
      (res: any) => {
        if (res?.success === 't') {
          this.refreshMenu()
          this.menuDataItem.name = values.name
          this.globalSuccess({ content: '修改成功' })
        }
      }
    )
  }

  /**
   * 弹窗提交
   */
  @action
  handleOk = (values: any) => {
    saveMenuApi(values).then((res: any) => {
      if (res?.success === 't') {
        this.refreshMenu()
        this.typeNum = 0
        this.visible = false
        this.globalSuccess({ content: '添加成功' })
      }
    })
  }

  /**
   * 选择菜单类型
   * @param key
   */
  @action
  chengeMenuType = (key: any) => {
    this.typeNum = key
  }

  /**
   * 重置
   * @param ref
   */
  @action
  reset = (ref: any) => {
    this.typeNum = this.menuDataItem.menuType
    ref.setFieldsValue({ ...this.menuDataItem })
  }

  /**
   * 重新加载菜单列表
   */
  @action
  refreshMenu = async () => {
    await layoutStore.getMenu()
    // 回显选中的菜单
    layoutStore.navActiveItemCache &&
      layoutStore.changeMenuLinkActive(layoutStore.navActiveItemCache)

    this.menuList()
  }
  /**
   * 批量删除二次确认删除
   */
  @action
  handleOkDel = () => {
    deleteBatchMenuApi({ ids: this.checkedKeys }).then((res: any) => {
      if (res?.success === 't') {
        this.refreshMenu()
        if (this.checkedKeys.includes(this.menuDataItem.id)) {
          this.selectedKeys = []
        }
        this.checkedKeys = []
        this.delVisible = false
        this.globalSuccess({ content: '删除成功' })
      }
    })
  }
  /**
   * 批量删除二次确认取消删除
   */
  @action
  handleCancelDel = () => {
    this.delVisible = false
  }
}

const menuStore = new MenuStore()
export default menuStore
