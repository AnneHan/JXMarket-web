import { useStore, Provider } from './provider/provider'

import layoutStore from './layout/layout.store'
import loginStore from './login/login.store'
import commonStore from './common.store'
import menuStore from './system/menuManagement.store'
import roleStore from './system/roleManagement.store'
import userStore from './system/userManagement.store'
import systemLogStore from './system/systemLog.store'
import dictStore from './system/dict.store'
import personalStore from './personal/personal.store'

import customerInfoStore from './business/saleManagement/customerInfo.store'
//import saleInfoStore from './business/saleManagement/saleInfo.store'

import supplierManagementStore from './business/purchaseManagement/supplierManagement.store'
import goodInfoStore from './business/purchaseManagement/goodInfo.store'
import purchaseInfoStore from './business/purchaseManagement/purchaseInfo.store'
import purchaseDetailStore from './business/purchaseManagement/purchaseDetail.store'

import goodInventoryStore from './business/inventoryManagement/goodInventory.store'

export const createStore = function () {
  return {
    layoutStore,
    loginStore,
    commonStore,
    menuStore,
    roleStore,
    userStore,
    systemLogStore,
    dictStore,
    personalStore,

    customerInfoStore,
    //saleInfoStore,

    supplierManagementStore,
    goodInfoStore,
    purchaseInfoStore,
    purchaseDetailStore,

    goodInventoryStore,
  }
}
export type IStoreTypes = ReturnType<typeof createStore>
export { observer } from 'mobx-react-lite'
export { Provider, useStore }
