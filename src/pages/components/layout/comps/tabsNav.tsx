import React, { useState, useCallback } from 'react'
import { Dropdown } from 'antd'
import { useIntl } from 'react-intl'
import { useStore, observer } from '@/store/index'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import Icon from '@/assets/svg'

interface IPopoverContentProps {
  closeTabItemHandle: (type: 'all' | 'right' | 'refresh' | 'other') => void
}

interface ITabItemProps {
  item: NavItem
}

/**
 * tab 鼠标右击事件 tool
 * @param props
 */
const TavItemRightTool: React.FC<IPopoverContentProps> = React.memo((props): React.ReactElement => {
  const { closeTabItemHandle } = props
  const intl = useIntl()

  return (
    <div className="select-dropdown">
      <ul className="dropdown-menu">
        <li className="dropdown-item" onClick={() => closeTabItemHandle('refresh')}>
          <Icon name="refresh" /> {intl.formatMessage({ id: '10019' }) /* 关闭左侧 */}
        </li>
        <li className="dropdown-item" onClick={() => closeTabItemHandle('right')}>
          <Icon name="zuojiantou" /> {intl.formatMessage({ id: '10020' }) /* 关闭右侧 */}
        </li>
        <li
          className="dropdown-item dropdown-item-selected"
          onClick={() => closeTabItemHandle('other')}
        >
          <Icon name="close" /> {intl.formatMessage({ id: '10018' }) /* 关闭其他 */}
        </li>
        <li className="dropdown-item" onClick={() => closeTabItemHandle('all')}>
          <Icon name="closeAll" /> {intl.formatMessage({ id: '10021' }) /* 全部关闭 */}
        </li>
      </ul>
    </div>
  )
})

/**
 * tab导航每个item
 * @param props
 */
const TabItem: React.FC<ITabItemProps> = observer((props): React.ReactElement => {
  const history = useHistory()
  const { layoutStore } = useStore()
  const { closeTabNavCurrent, navItemClick, closeTabNavHandle } = layoutStore

  const [visible, setVisible] = useState(false)

  const closeTabItemHandle = useCallback((type: 'all' | 'right' | 'refresh' | 'other') => {
    closeTabNavHandle(type, props.item, history)
    setVisible(false)
  }, [])

  return (
    <Dropdown
      visible={visible}
      trigger={['contextMenu']}
      destroyPopupOnHide={true}
      onVisibleChange={visible => setVisible(visible)}
      overlay={<TavItemRightTool {...props} closeTabItemHandle={closeTabItemHandle} />}
    >
      <div className={classNames('layout-nav-item', { active: props.item.active })}>
        <span onClick={() => navItemClick(props.item, history)}>{props.item.name}</span>
        <span
          onClick={() => closeTabNavCurrent(props.item, history)}
          className="layout-nav-item-close flex-align-center"
        >
          {props.item.needClose === false ? '' : <Icon name="close" />}
        </span>
      </div>
    </Dropdown>
  )
})

/**
 * tabs 菜单导航
 */
const TabsNavComps: React.FC = observer((): React.ReactElement => {
  const { layoutStore } = useStore()
  const { needArrow, navItems, navArrowHandle } = layoutStore

  return (
    <div className="layout-item-wrap flex-jsc-between">
      {/* 首箭头 TODO */}
      {needArrow && (
        <div
          className="layout-nav-item nav-item-arrow"
          onClick={() => {
            navArrowHandle('left')
          }}
        >
          <i className="icon fa fa-angle-double-left "></i>
        </div>
      )}
      {/* nav item */}
      <div className="flex-1" id="navItemsWrap">
        <div id="navItems" className="layout-items flex ">
          {navItems && navItems.map((item: NavItem, i: number) => <TabItem item={item} key={i} />)}
        </div>
      </div>
      {/* 尾箭头 */}
      {needArrow && (
        <div
          className="layout-nav-item nav-item-arrow m-l-5"
          onClick={() => navArrowHandle('right')}
        >
          <i className="icon fa fa-angle-double-right"></i>
        </div>
      )}
    </div>
  )
})

export default TabsNavComps
