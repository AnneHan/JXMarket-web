import React, {useCallback} from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import { useStore, observer } from '@/store/index'

/**
 * mini版菜单
 */
const SidebarMini: React.FC = (): React.ReactElement => {
  const history = useHistory()
  const { layoutStore } = useStore()
  const { navConfig, isSidebarMini, changeMenuLinkActive } = layoutStore

  const handleNavLink = useCallback((currentUrl: any) => {
    changeMenuLinkActive(currentUrl)
    if (!currentUrl.url) return
    history.push(currentUrl.url)
  }, []) 

  return (
    <>
      {navConfig &&
        navConfig.length > 0 &&
        navConfig.map((item: any) => (
          <div key={item.name} className={classNames('nav-item')}>
            <p
              className={classNames('flex-align-center flex-jsc-between p-l-20', {
                active: !(item.child && item.child.length) && item.active,
              })}
              onClick={() => handleNavLink(item)}
            >
              <span className="flex-nowrap">
                <i className={classNames('fa', item.icon)}></i>
                <span className={classNames({ hide: isSidebarMini })}>{item.name}</span>
              </span>
              {item.child && item.child.length ? <i className="fa fa-angle-down"></i> : <></>}
            </p>
            {item.child && item.child.length ? (
              <div className={classNames('child-item')}>
                {item.child.map((childItem: any, index: number) => (
                  <p
                    className={classNames(' flex-align-center flex-jsc-between p-l-20', {
                      active: childItem.active,
                    })}
                    key={childItem.id}
                    onClick={() => handleNavLink(childItem)}
                  >
                    {childItem.name}
                  </p>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
    </>
  )
}

export default observer(SidebarMini)
