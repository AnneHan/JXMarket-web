import { RouteComponentProps } from 'react-router-dom'

declare global {
  declare type Recordable<T = any> = Record<string, T>
  // 全局路由Props, 继承 `RouteComponentProps`
  export interface IRouterProps extends RouteComponentProps {
    [key: string]: any
  }
  export interface IActionProps {
    type: string
    payload: any
  }

  export interface IObjectProps {
    [key: string]: any
  }

  export interface ILocationProps {
    hash: string
    pathname: string
    search: string
    state: IObjectProps | undefined
  }

  export interface IMatchProps {
    isExact: boolean
    path: string
    url: string
    params: IObjectProps | undefined
  }

  interface MenuChild {
    id: string
    parentId: string
    name: string
    active: boolean
    url: string
    height?: Number
    needClose?: boolean
  }

  interface Menu {
    id: string
    name: string
    icon: string
    height: Number
    active: boolean
    url: string
    child?: Array<MenuChild>
  }
  interface Theme {
    name: string
    active: Boolean
  }

  interface System {
    PROJECT_PATH: string
    INDEX_URL: string
    AUTH_TOKEN: string
    LOCAL_TOKEN: string
    AUTH_USERNAME_TOKEN: string
    AUTH_SECRET_PREFIX: string
    AUTH_SECRET_SUFFIX: string
    NAVCONFIG: string
    LOCALE: string
    THEME: string
  }

  interface NavItem {
    id: string
    url: string
    name: string
    active: boolean
    height: Number
    parentId?: string
    child?: Array<MenuChild>
    needClose?: boolean
    menuType?: number | null
  }

  interface IRouteItemType {
    path: string
    component: React.ComponentType<IRouterProps>
    title: string
  }
}
