import React, { useEffect, useRef } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { BackTop, ConfigProvider } from 'antd'

import classNames from 'classnames'
import { useStore } from '@/store/index'
import { observer } from 'mobx-react-lite'
import Utils from '@/utils'
import { KEY } from '@/utils/constant'

import LayoutHeader from '../pages/components/layout/layoutHeader'
import LayoutSidebar from '../pages/components/layout/layoutSidebar'
import LayoutTool from '../pages/components/layout/layoutTool'
import LayoutNav from '../pages/components/layout/layoutNav'
import GlobalLoading from '@/pages/modules/loading/globalLoading'
import NotFound from '@/pages/components/404/index'

import routeConfig from './routerConfig'

// antd 组件汉化
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const { Suspense } = React

/**
 * 页面渲染
 */
const PageContainer: React.FC = React.memo((): React.ReactElement => {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <Switch>
        {routeConfig.map((item: IRouteItemType, i) => {
          return (
            <Route
              key={i}
              path={item.path}
              render={props => <item.component path={item.path} {...props} title={item.title} />}
            />
          )
        })}
        <Route path={'*'} component={NotFound} />
      </Switch>
    </Suspense>
  )
})

/**
 * 管理页面 菜单栏 header tool 子页面
 */
const Layout: React.FC = (): React.ReactElement => {
  const container = useRef(null)
  const history = useHistory()
  const { layoutStore, commonStore } = useStore()
  const { layoutType, layoutInitHandle } = layoutStore

  useEffect(() => {
    layoutInitHandle()
    commonStore.initHistory(history)

    if (!Utils.getLocal(KEY.TOKEN)) {
      // 拦截 重新登录
      Utils.removePlatToken()
      Utils.logoutTologinPage()
    }
  }, [])

  return (
    <div>
      <div className={classNames('layout-wrap', 'flex', { 'flex-direction-column': !layoutType })}>
        {layoutType ? <LayoutSidebar /> : <LayoutHeader />}
        <div
          className={classNames('content-wrap', 'flex-1', { 'flex-direction-column': layoutType })}
        >
          {layoutType ? <LayoutHeader /> : <LayoutSidebar />}
          <div className="container" ref={container}>
            {/* 面包屑导航 */}
            <LayoutNav />
            {/* 子组件 */}
            <ConfigProvider locale={zh_CN}>
              <section className="container-page">
                {/* 页面 */}

                <PageContainer />

                {/* 返回到页面顶部 */}
                <BackTop
                  className="hyl-back-top"
                  target={(): any => document.querySelector('.container-page')}
                />
              </section>
            </ConfigProvider>
          </div>
          {/* 工具栏 */}
          <LayoutTool />
        </div>
      </div>
    </div>
  )
}

export default observer(Layout)
