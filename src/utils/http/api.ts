import Request from './interceptors'

// 登录接口
export const loginApi = function <T>(data: T) {
  return Request.post({ url: '/system/login', data })
}

// 系统管理
// 角色管理列表接口
export const getRoleListApi = function <T>(data: T) {
  return Request.get({ url: '/system/sys-role-entity/list', params: data })
}

// 角色管理删除接口
export const delRoleListApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-role-entity/delete', data })
}

// 角色管理新增接口
export const saveRoleListApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-role-entity/save', data })
}

// 角色管理编辑接口
export const updateRoleListApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-role-entity/update', data })
}

// 角色管理ID查询角色信息接口
export const infoRoleListApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-role-entity/info', data })
}

// 用户管理列表
export const getUserListApi = function <T>(data: T) {
  return Request.post({ url: '/system/user/list', data })
}

// 用户管理新增
export const saveUserListApi = function <T>(data: T) {
  return Request.post({ url: 'system/user/save', data })
}

// 用户管理编辑
export const updateUserListApi = function <T>(data: T) {
  return Request.post({ url: 'system/user/update', data })
}

// 用户管理删除
export const delUserListApi = function <T>(data: T) {
  return Request.post({ url: '/system/user/delete', data })
}

// 用户重置密码
export const resetUserListApi = function <T>(data: T) {
  return Request.post({ url: '/system/user/resetPassword', data })
}

// 用户头像上传
export const uploadAvatarApi = function <T>(data: T) {
  return Request.post({ url: '/system/user/avatar', data })
}

// 个人中心修改密码
export const updatePasswordApi = function <T>(data: T) {
  return Request.post({ url: '/system/user/updatePassword', data })
}

// 菜单接口
export const getMenuApi = function <T>(data: T) {
  return Request.get({ url: '/system/sys-permission-entity/nav', params: { userId: data } })
}

// 菜单列表
export const menuListApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-permission-entity/list', data })
}

// 删除菜单
export const delmenuApi = function <T>(data: T) {
  return Request.get({ url: '/system/sys-permission-entity/delete', params: data }) // 暂不使用
}

// 根据父菜单查询子菜单
export const menuInfoApi = function <T>(data: T) {
  return Request.get({ url: '/system/sys-permission-entity/info', params: data }) // 暂不使用
}

// 编辑菜单
export const updateMenuApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-permission-entity/update', data })
}

// 新增菜单
export const saveMenuApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-permission-entity/save', data })
}

// 搜索菜单
export const searchMenuApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-permission-entity/keyWord', data })
}

// 通过角色查询菜单信息
export const roleMenuApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-role-entity/permissByRoleId', data })
}

// 批量删除菜单
export const deleteBatchMenuApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-permission-entity/deleteBatch', data })
}

// 根据角色更新菜单
export const updateByRoleIdMenuApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-permission-entity/updateByRoleId', data })
}

// 获取父级菜单
export const queryByTypeMenuApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-permission-entity/queryListByType', data })
}

// 系统日志列表
export const getSystemLogApi = function <T>(data: T) {
  return Request.post({ url: '/system/sys-log-entity/list', data })
}

// 更改用户冻结状态
export const updateUserStatusApi = function <T>(data: T) {
  return Request.post({ url: '/system/user/updateUserStatus', data })
}

// 字典查询接口
export const getCodeTypeApi = function <T>(data: T) {
  return Request.post({ url: '/business/codeType/select', data })
}

// 字典详情接口
export const codeTypeDetailApi = function <T>(data: T) {
  return Request.post({ url: '/business/codeType/detail', data })
}

// 字典更新接口
export const updCodeTypeApi = function <T>(data: T) {
  return Request.post({ url: '/business/codeType/upd', data })
}

// 字典新增接口
export const addCodeTypeApi = function <T>(data: T) {
  return Request.post({ url: '/business/codeType/add', data })
}

// 字典删除接口
export const delCodeTypeApi = function <T>(data: T) {
  return Request.post({ url: '/business/codeType/del', data })
}

/**
 * 客户管理
 * @param data
 * getCustomerInfoApi, delCustomerInfoApi, updateCustomerInfoApi
 */
// 客户管理列表
export const getCustomerInfoApi = function <T>(data: T) {
  return Request.post({ url: '/business/sale/custom/list', data })
}

// 客户管理新增/修改
export const updateCustomerInfoApi = function <T>(data: T) {
  return Request.post({ url: '/business/sale/custom/deal', data })
}

// 客户管理删除
export const delCustomerInfoApi = function <T>(data: T) {
  return Request.post({ url: '/business/sale/custom/delete', data })
}

/**
 * 供应商管理
 * @param data
 */
export const getSupplierManagementApi = function <T>(data: T) {
  return Request.post({ url: '/business/purchase/supplier/list', data })
}
export const updateSupplierManagementApi = function <T>(data: T) {
  return Request.post({ url: '/business/purchase/supplier/deal', data })
}
export const delSupplierManagementApi = function <T>(data: T) {
  return Request.post({ url: '/business/purchase/supplier/delete', data })
}

/**
 * 商品信息
 * @param data
 */
export const getGoodInfoApi = function <T>(data: T) {
  return Request.post({ url: '/business/purchase/good/list', data })
}
export const updateGoodInfoApi = function <T>(data: T) {
  return Request.post({ url: '/business/purchase/good/deal', data })
}
export const delGoodInfoApi = function <T>(data: T) {
  return Request.post({ url: '/business/purchase/good/delete', data })
}

/**
 * 商品存量
 * @param data
 */
export const getGoodInventoryApi = function <T>(data: T) {
  return Request.post({ url: '/business/inventory/good-num/list', data })
}
export const updateGoodInventoryApi = function <T>(data: T) {
  return Request.post({ url: '/business/inventory/good-num/deal', data })
}
export const delGoodInventoryApi = function <T>(data: T) {
  return Request.post({ url: '/business/inventory/good-num/delete', data })
}

/**
 * 采购单信息
 * @param data
 */
export const getPurchaseInfoApi = function <T>(data: T) {
  return Request.post({ url: '/business/purchase/pur/list', data })
}
export const updatePurchaseInfoApi = function <T>(data: T) {
  return Request.post({ url: '/business/purchase/pur/deal', data })
}
export const delPurchaseInfoApi = function <T>(data: T) {
  return Request.post({ url: '/business/purchase/pur/delete', data })
}

/**
 * 采购单明细
 * @param data
 */
export const getPurchaseDetailApi = function <T>(data: T) {
  return Request.post({ url: '/business/purchase/pur-detail/list', data })
}
export const updatePurchaseDetailApi = function <T>(data: T) {
  return Request.post({ url: '/business/purchase/pur-detail/deal', data })
}
export const delPurchaseDetailApi = function <T>(data: T) {
  return Request.post({ url: '/business/purchase/pur-detail/delete', data })
}

