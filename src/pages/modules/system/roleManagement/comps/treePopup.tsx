import React from 'react'
import { Tree } from 'antd'
import { useStore, observer } from '@/store/index'
import styles from './index.module.scss'

/**
 * 角色管理菜单权限分配
 * @returns
 */
const DialogTree: React.FC = (): React.ReactElement => {
  const { menuStore } = useStore()
  const { expandedKeys, checkedKeys, selectedKeys, treeData, onSelect, onCheck, onExpand } =
    menuStore

  return (
    <div className={styles.treeRoleWarp}>
      <Tree
        className="menu-tree"
        height={500}
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={!expandedKeys.length}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        onCheck={onCheck}
        selectedKeys={selectedKeys}
        treeData={treeData}
        checkStrictly={true}
      />
    </div>
  )
}
export default observer(DialogTree)
