import React, { useRef } from 'react'
import { useStore, observer } from '@/store/index'
import classNames from 'classnames'

import SidebarMini from './comps/sidebarMini'
import SidebarNormal from './comps/sidebarNormal'
import ChangeSidebarButtom from './comps/changeSidebarButtom'

/**
 * 侧边菜单
 */
const LayoutSidebar: React.FC = (): React.ReactElement => {
  const { layoutStore } = useStore()
  const { isSidebarMini, layoutType } = layoutStore
  const container = useRef<HTMLDivElement | null>(null)

  return (
    <aside
      id="sidebar"
      className={classNames('sidebar', {
        'sidebar-mini': isSidebarMini,
        'sidebar-normal': !isSidebarMini,
      })}
      ref={container}
    >
      {layoutType && (
        <h2 className="logo flex-center">
          {isSidebarMini ? (
            <img
              className="logo-small"
              src={require('@/assets/images/logo-small.png')}
              alt="logo"
            />
          ) : (
            <img src={require('@/assets/images/wechat-logo.png')} alt="logo" />
          )}
        </h2>
      )}

      <div className="sidebar-item-wrap">
        {/** 菜单*/ isSidebarMini ? <SidebarMini /> : <SidebarNormal />}
      </div>

      {/** 菜单的伸缩按钮 */}
      <ChangeSidebarButtom />
    </aside>
  )
}

export default observer(LayoutSidebar)
