import React from 'react'
import { useStore, observer } from '@/store/index'

/**
 *面包屑导航
 */
const BreadCrumbsComps: React.FC = (): React.ReactElement => {
  const { layoutStore } = useStore()
  const { breadCrumbsList } = layoutStore
  const len = breadCrumbsList.length
  return (
    <div className="bread-crumbs flex-align-center">
      {breadCrumbsList &&
        // @ts-ignore
        breadCrumbsList.map((item: NavItem, i: number) => (
          <span key={`bread${i}`}>
            <>
              {item}
              {/* 最后一项不需要 / */}
              {len - 1 !== i ? <i className="bread-crumbs-line">/</i> : ''}
            </>
          </span>
        ))}
    </div>
  )
}

export default observer(BreadCrumbsComps)
