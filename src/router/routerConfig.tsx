import React from 'react'
import ROUTER from './constant'

const { lazy } = React

//  /* webpackPrefetch:true */  预加载 webpack就会在浏览器的空闲时间帮我们下载好
// 页面
const routeConfig: Array<IRouteItemType> = [
  {
    path: ROUTER.MONITOR,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"dashboard" */ /* webpackPrefetch:true */ '@/pages/modules/dashboards/monitor/index'
        )
    ),
    title: '10017',
  },
  {
    path: ROUTER.NOTFOUND,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"404" */ /* webpackPrefetch:true */ '@/pages/components/404/index'
        )
    ),
    title: '404',
  },
  {
    path: ROUTER.USERMANAGEMENT,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@/pages/modules/system/userManagement/index'
        )
    ),
    title: '10023',
  },
  {
    path: ROUTER.USERMANAGEMENTEDIT,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@/pages/modules/system/userManagement/comps/edit'
        )
    ),
    title: '10023',
  },
  {
    path: ROUTER.MENUMANAGEMENT,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@/pages/modules/system/menuManagement/index'
        )
    ),
    title: '10024',
  },
  {
    path: ROUTER.ROLEMANAGEMENT,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@/pages/modules/system/roleManagement/index'
        )
    ),
    title: '10025',
  },
  {
    path: ROUTER.PERSONAL,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@/pages/modules/personal/index'
        )
    ),
    title: 'personalCenter',
  },
  {
    path: ROUTER.SYSTEMLOG,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@/pages/modules/system/systemLog/index'
        )
    ),
    title: '10049',
  },
  {
    path: ROUTER.DICT,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"business" */ /* webpackPrefetch:true */ '@/pages/modules/system/dict'
        )
    ),
    title: '10073',
  },
  {
    path: ROUTER.DICTDETAIL,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"business" */ /* webpackPrefetch:true */ '@/pages/modules/system/dict/comps/detail'
        )
    ),
    title: '10073',
  },

  {
    path: ROUTER.CUSTOMERINFO,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@/pages/modules/business/saleManagement/customerInfo'
          )
    ),
    title: '10023',
  },
  {
    path: ROUTER.CUSTOMERINFOEDIT,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@pages/modules/business/saleManagement/customerInfo/comps/edit'
          )
    ),
    title: '10023',
  },

  {
    path: ROUTER.SUPPLIERMANAGEMENT,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@/pages/modules/business/purchaseManagement/supplierManagement'
          )
    ),
    title: '10023',
  },
  {
    path: ROUTER.SUPPLIERMANAGEMENTEDIT,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@pages/modules/business/purchaseManagement/supplierManagement/comps/edit'
          )
    ),
    title: '10023',
  },

  {
    path: ROUTER.GOODINFO,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@/pages/modules/business/purchaseManagement/goodInfo'
          )
    ),
    title: '10023',
  },
  {
    path: ROUTER.GOODINFOEDIT,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@pages/modules/business/purchaseManagement/goodInfo/comps/edit'
          )
    ),
    title: '10023',
  },

  {
    path: ROUTER.GOODINVENTORY,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@/pages/modules/business/inventoryManagement/goodInventory'
          )
    ),
    title: '10023',
  },
  {
    path: ROUTER.GOODINVENTORYEDIT,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@pages/modules/business/inventoryManagement/goodInventory/comps/edit'
          )
    ),
    title: '10023',
  },

  {
    path: ROUTER.PURCHASEINFO,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@/pages/modules/business/purchaseManagement/purchaseInfo'
          )
    ),
    title: '10023',
  },
  {
    path: ROUTER.PURCHASEINFOEDIT,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@pages/modules/business/purchaseManagement/purchaseInfo/comps/edit'
          )
    ),
    title: '10023',
  },

  {
    path: ROUTER.PURCHASEDETAIL,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@/pages/modules/business/purchaseManagement/purchaseDetail'
          )
    ),
    title: '10023',
  },
  {
    path: ROUTER.PURCHASEDETAILEDIT,
    component: lazy(
      () =>
        import(
          /* webpackChunkName:"system" */ /* webpackPrefetch:true */ '@pages/modules/business/purchaseManagement/purchaseDetail/comps/edit'
          )
    ),
    title: '10023',
  },
]

export default routeConfig
