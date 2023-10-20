import React from 'react'
import BreadCrumbsComps from './comps/beadCrumbs'
import TabsNavComps from './comps/tabsNav'

/**
 * container 顶部导航(tabs、面包屑)
 */
const LayoutNav: React.FC = (): React.ReactElement => {
  return (
    <div className="layout-nav flex-jsc-between">
      {/* 菜单导航 */}
      <TabsNavComps />
      {/* 面包屑 */}
      <BreadCrumbsComps />
    </div>
  )
}

export default LayoutNav
