import React from 'react'
import classNames from 'classnames'
import { useStore, observer } from '@/store/index'

/**
 * 菜单的伸缩按钮
 */
const ChangeSidebarButtom: React.FC = (): React.ReactElement => {
  const { layoutStore } = useStore()
  const { changeSidebarWidth, isSidebarMini } = layoutStore
  
  return (
    <div className="sidebar-minify-btn flex-center" onClick={()=>changeSidebarWidth()}>
      <i
        className={classNames(isSidebarMini ? 'fa fa-angle-double-right' : 'fa fa-angle-double-left')}
      ></i>
    </div>
  )
}

export default observer(ChangeSidebarButtom)
