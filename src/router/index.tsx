import React, { ReactElement, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { IntlProvider, useIntl } from 'react-intl'
import locales from '@/utils/locales'
import { SYSTEM } from '@/utils'
import { Provider, useStore } from '@/store'

import 'antd/dist/antd.min.css'
import '@/assets/styles/normalize.css'
import '@/assets/styles/common.scss'
import '@/assets/styles/layout.scss'

import ROUTER from './constant'

import GlobalLoading from '@/pages/modules/loading/globalLoading'
import NotFound from '@/pages/components/404/index'

const routeConfig: Array<IRouteItemType> = [
  {
    path: ROUTER.LOGIN,
    component: lazy(() => import(/* webpackChunkName:'layout' */ '@/pages/modules/login')),
    title: '登录',
  },
  {
    path: '/',
    component: lazy(() => import(/* webpackChunkName:'layout' */ '@/router/layout')),
    title: '首页',
  },
]

const RouterComps: React.FC = observer((): ReactElement => {
  const intl = useIntl()
  return (
    <Router>
      <Suspense fallback={<GlobalLoading />}>
        <Switch>
          <Redirect path="/" exact to={ROUTER.MONITOR} />
          {routeConfig.map((item: IRouteItemType, i) => {
            return (
              <Route
                key={i}
                path={item.path}
                render={props => (
                  <item.component {...props} $intl={intl.formatMessage} title={item.title} />
                )}
              />
            )
          })}
          <Route path={'*'} component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  )
})

const LanguageProvider: React.FC = observer((): ReactElement => {
  const { layoutStore } = useStore()
  const { lang } = layoutStore

  return (
    <IntlProvider
      locale={lang}
      defaultLocale={SYSTEM.LANGUAGE[0]}
      //@ts-ignore
      messages={locales[lang]}
    >
      <RouterComps />
    </IntlProvider>
  )
})

const App: React.FC = (): ReactElement => {
  return (
    // @ts-ignore
    <Provider>
      <LanguageProvider />
    </Provider>
  )
}

export default App
