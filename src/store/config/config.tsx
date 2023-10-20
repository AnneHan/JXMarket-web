import ROUTER from '@/router/constant'

/**
 * 主题
 */
const themes: Array<Theme> = [
  { name: 'theme-gray', active: true },
  { name: 'theme-deepBlue', active: false },
  { name: 'theme-blue', active: false },
  { name: 'theme-purple', active: false },
]

/**
 * 菜单
 */
const menu: Array<Menu> = [
  {
    id: '0',
    name: 'Dashboards',
    icon: 'fa-home',
    active: false,
    height: 40,
    url: '',
    child: [
      {
        id: '0_1',
        parentId: '0',
        name: 'Dashboard',
        active: true,
        height: 40,
        url: ROUTER.HOME,
        needClose: false,
      },
      {
        id: '0_2',
        parentId: '0',
        name: '监控页',
        active: false,
        height: 40,
        url: ROUTER.MONITOR,
      },
    ],
  },
  {
    id: '1',
    name: 'system',
    icon: 'fa fa-table',
    active: false,
    height: 40,
    url: '',
    child: [
      {
        id: '1_1',
        parentId: '1',
        name: 'user',
        active: false,
        height: 40,
        url: ROUTER.USERMANAGEMENT,
      },
      {
        id: '1_2',
        parentId: '1',
        name: 'menu',
        active: false,
        height: 40,
        url: ROUTER.MENUMANAGEMENT,
      },
      {
        id: '1_3',
        parentId: '1',
        name: 'role',
        active: false,
        height: 40,
        url: ROUTER.ROLEMANAGEMENT,
      },
    ],
  },
  {
    id: '2',
    name: 'Tables',
    icon: 'fa fa-table',
    active: false,
    height: 40,
    url: '',
    child: [
      {
        id: '2_1',
        parentId: '2',
        name: 'Table',
        active: false,
        height: 40,
        url: ROUTER.ROLEMANAGEMENT,
      },
      {
        id: '2_2',
        parentId: '2',
        name: 'Editable',
        active: false,
        height: 40,
        url: ROUTER.MENUMANAGEMENT,
      },
      {
        id: '2_3',
        parentId: '2',
        name: 'DragTable',
        active: false,
        height: 40,
        url: ROUTER.ROLEMANAGEMENT,
      },
    ],
  },
  {
    id: '4',
    name: '异常页',
    icon: 'fa-warning',
    active: false,
    height: 40,
    url: '',
    child: [
      {
        id: '4_1',
        parentId: '4',
        name: '404',
        url: ROUTER.NOTFOUND,
        active: false,
      },
    ],
  },
]

/**
 * tab导航右键删除类型
 */
const closeType: IObjectProps = {
  all: 'all',
  right: 'right',
  refresh: 'refresh',
  other: 'other',
}

export { themes, menu, closeType }
