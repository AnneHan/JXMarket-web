import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
import { Tree, Button, Input, Modal, Spin } from 'antd'
import withTransition from '@/router/withTransitionHoc'

import { useStore, observer } from '@/store/index'
import styles from './index.module.scss'
import Edit from './comps/edit'
import AddModal from './comps/addModal'
import ModalComps from '@/pages/components/modal'

const { Search } = Input

/**
 * 菜单管理
 * @returns
 */
const Menus: React.FC = (): React.ReactElement => {
  const intl = useIntl()
  const { menuStore } = useStore()
  const {
    treeData,
    visible,
    menuDataItem,
    expandedKeys,
    checkedKeys,
    selectedKeys,
    delVisible,
    loading,
    menuList,
    onCheck,
    onExpand,
    onSelect,
    onExpandAll,
    onExpandClose,
    menuSearch,
    showModal,
    deleteBatch,
    handleOkDel,
    handleCancelDel,
    valueNull,
    handleOk,
    setProperty,
  } = menuStore

  useEffect(() => {
    menuList()
  }, [menuList])

  return (
    <div className={`page ${styles.menuWarp}`}>
      <Helmet title={intl.formatMessage({ id: '10024' }) /* 菜单 */} />
      <div className={styles.menuContent}>
        <div className={styles.tree}>
          <div className={`page-title p-b-none ${styles.treeTitle}`}>
            {intl.formatMessage({ id: '10024' })}
          </div>
          <div className={styles.treeBtn}>
            <Button onClick={() => showModal()}>{intl.formatMessage({ id: '10026' })}</Button>
            {!expandedKeys.length ? (
              <Button onClick={() => onExpandAll()}>{intl.formatMessage({ id: '10027' })}</Button>
            ) : (
              <Button onClick={() => onExpandClose()}>{intl.formatMessage({ id: '10028' })}</Button>
            )}
            {checkedKeys.length ? <Button onClick={() => deleteBatch()}>批量删除</Button> : <></>}
          </div>
          <div className={styles.treeStructure}>
            <div className={styles.search}>
              <Search
                className="menu-search"
                placeholder={intl.formatMessage({ id: '10029' })}
                onSearch={menuSearch}
                onChange={valueNull}
                loading={loading}
                allowClear
              />
            </div>
            <div className={styles.treeMenu}>
              {loading ? (
                <div className={styles.spin}>
                  <Spin />
                </div>
              ) : (
                <></>
              )}
              <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={!expandedKeys.length}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                onCheck={onCheck}
                selectedKeys={selectedKeys}
                treeData={treeData}
                className="menu-tree"
              />
            </div>
          </div>
        </div>
        <div className={styles.edit}>
          <div className={styles.editTitel}>
            <i className="fa fa-th" aria-hidden="true"></i> {intl.formatMessage({ id: '10030' })}
            {selectedKeys.length ? `：${menuDataItem?.name}` : ''}
          </div>
          <div className={styles.compile}>
            {selectedKeys.length ? (
              <Edit />
            ) : (
              <div className={styles.reminder}>从菜单列表选择一项后，进行编辑</div>
            )}
          </div>
        </div>
      </div>
      <ModalComps
        destroyOnClose
        title="新增菜单"
        width={550}
        visible={visible}
        onOk={handleOk}
        onCancel={() => {
          setProperty({ key: 'visible', data: false })
          setProperty({ key: 'typeNum', data: 0 })
        }}
      >
        <AddModal />
      </ModalComps>
      <Modal
        title="批量删除"
        visible={delVisible}
        onCancel={handleCancelDel}
        className="hyl-modal"
        centered
        destroyOnClose
        footer={[
          <div key="btn">
            <Button key="submit" type="primary" onClick={handleOkDel}>
              确认
            </Button>
            <Button key="back" onClick={handleCancelDel}>
              取消
            </Button>
          </div>,
        ]}
      >
        <p>您确认要删除已选择的菜单数据吗？</p>
      </Modal>
    </div>
  )
}

export default withTransition(observer(Menus))
