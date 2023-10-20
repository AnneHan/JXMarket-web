import React from 'react'
import classNames from 'classnames'
import { useIntl } from 'react-intl'
import { useStore, observer } from '@/store/index'
import { CSSTransition } from 'react-transition-group'

import Mask from '@/pages/components/mask'

/**
 * 布局 横向demo
 */
const HorizontalDemo = observer(() => {
  const { layoutStore } = useStore()
  const { layoutType, changeLayoutType } = layoutStore
  return (
    <div
      className={classNames('layout-horizontal-demo', 'flex-1-no', 'cursor-pointer', {
        active: !layoutType,
      })}
      onClick={() => changeLayoutType(false)}
    >
      <div className="layout-horizontal-demo__header"></div>
      <div className="layout-horizontal-demo__content flex">
        <div className="layout-horizontal-demo__menu"></div>
        <div className="layout-horizontal-demo__container"></div>
      </div>
    </div>
  )
})

/**
 * 布局 竖向demo
 */
const VerticalDemo = observer(() => {
  const { layoutStore } = useStore()
  const { layoutType, changeLayoutType } = layoutStore

  return (
    <div
      className={classNames('layout-vertical-demo', 'flex', 'flex-1-no', 'cursor-pointer', {
        active: layoutType,
      })}
      onClick={() => changeLayoutType(true)}
    >
      <div className="layout-vertical-demo__menu"></div>
      <div className="layout-vertical-demo__content flex-direction-column">
        <div className="layout-vertical-demo__header"></div>
        <div className="layout-vertical-demo__container"></div>
      </div>
    </div>
  )
})

const LayoutTool: React.FC = (): React.ReactElement => {
  const intl = useIntl()
  const { layoutStore } = useStore()
  const { themes, layoutType, toolShow, changeTheme, showTool } = layoutStore

  return (
    <div
      className={classNames('layout-tool-wrap', 'flex', {
        'layout-tool-wrap-vertical': layoutType,
      })}
    >
      <Mask show={toolShow} onClick={() => showTool(false)} />
      <CSSTransition in={toolShow} timeout={500} classNames={'show'} unmountOnExit={true}>
        <div className="layout-tool">
          <section className="layout-tool-section">
            <p className="tilte m-t-10">{intl.formatMessage({ id: '10001' }) /*主题风格设置 */}</p>
            <div className="themes flex-center m-t-10">
              {themes &&
                themes.map((item: any) => (
                  <div
                    key={item.name}
                    onClick={() => changeTheme(item)}
                    className={classNames('themes-item', 'cursor-pointer', item.name, {
                      active: item.active,
                    })}
                  ></div>
                ))}
            </div>
          </section>
          <section className="layout-tool-section">
            <p className="tilte m-t-10"> {intl.formatMessage({ id: '10002' }) /*布局 */}</p>
            <div className="layout-tool-layout flex-center m-t-10">
              {/* 横向 */}
              <HorizontalDemo />
              {/* 竖向 */}
              <VerticalDemo />
            </div>
          </section>
        </div>
      </CSSTransition>
    </div>
  )
}
export default observer(LayoutTool)
