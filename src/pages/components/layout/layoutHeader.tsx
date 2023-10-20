import React from 'react'
import { useStore, observer } from '@/store/index'
import { useIntl } from 'react-intl'
import HeaderTools from './comps/headerTools'

const LayoutHeader: React.FC = (props): React.ReactElement => {
  const intl = useIntl()
  const { layoutStore } = useStore()
  const { layoutType } = layoutStore

  return (
    <header id="layout_header" className="flex-jsc-between">
      <div className="website-tilte flex">
        <div className="logo">
          {!layoutType && <img src={require('@/assets/images/logo.png')} alt="logo" />}
        </div>
        <h2>{intl.formatMessage({ id: '10013' }) /* 大华社区锦绣超市进销存信息管理系统 */} </h2>
      </div>
      <HeaderTools />
    </header>
  )
}

export default observer(LayoutHeader)
