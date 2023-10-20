import React, { useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
import { Button, Popconfirm } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import withTransition from '@/router/withTransitionHoc'

import { useStore, observer } from '@/store/index'
import DialogTree from './comps/treePopup'
import { RoleListItem } from '@/store/system/roleManagement.store'
import RoleListModal from './comps/edit'
import ModalComps from '@/pages/components/modal'

/**
 * 角色管理
 */
const Role: React.FC = (): React.ReactElement => {
  const intl = useIntl()

  const { roleStore, menuStore } = useStore()
  const {
    visible,
    modalData,
    showTreeFlag,
    submitEdit,
    delRoleEntity,
    getRoleList,
    setShowTreeFlag,
    setRolesList,
    setProperty,
    submitTree,
    closeShowFlag,
  } = roleStore
  const { expandedKeys, checkedKeys, onExpandAll, onExpandClose, onCheckAll, onCheckClose } =
    menuStore

  const ref = useRef<ActionType>()

  const columns: ProColumns<RoleListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      fixed: 'left',
      width: 48,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      ellipsis: true,
    },
    {
      title: '角色code',
      dataIndex: 'roleCode',
      ellipsis: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <p className="cursor-pointer blue" key="editable" onClick={() => setShowTreeFlag(record)}>
          菜单权限
        </p>,
        <p className="cursor-pointer blue" key="view" onClick={() => setRolesList(action, record)}>
          编辑
        </p>,
        <Popconfirm
          title="您确定要删除此角色吗？"
          onConfirm={() => delRoleEntity(record.id, action)}
          onCancel={() => {}}
          okText="确定"
          cancelText="取消"
          key="Popconfirm"
          placement="leftTop"
        >
          <p className="cursor-pointer blue" key="delete">
            删除
          </p>
        </Popconfirm>,
      ],
    },
  ]

  const tableRequest = async (params: any, sort: any, filter: any) => {
    const msg: any = await getRoleList({
      ...params,
      roleName: params.roleName || '',
      pages: params.current,
      pageSize: params.pageSize,
    })
    if (!msg) return { success: false }

    return {
      data: msg?.result?.list,
      success: true,
      total: msg?.result?.totalCount,
    }
  }

  return (
    <div className="page">
      <Helmet title={intl.formatMessage({ id: '10025' }) /* 角色 */} />
      <div className="page-title p-b-none">{intl.formatMessage({ id: '10025' })}</div>
      <ProTable<RoleListItem>
        className="hyl-table"
        columns={columns}
        request={tableRequest}
        actionRef={ref}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          span: 6,
          optionRender: (_, __, dom) => [...dom.reverse()], // 搜索，重置按钮换位置
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        dateFormatter="string"
        toolbar={{
          actions: [
            <Button key="add" icon={<PlusOutlined />} onClick={() => setRolesList(ref.current)}>
              添加角色
            </Button>,
          ],
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return { ...values }
            }
            return values
          },
          syncToInitialValues: false, // 重置清空
        }}
      />
      <ModalComps
        destroyOnClose
        title={`${!modalData ? '新增' : '编辑'}角色`}
        width={600}
        visible={visible}
        onOk={submitEdit}
        onCancel={() => setProperty({ key: 'visible', data: false })}
      >
        <RoleListModal />
      </ModalComps>
      <ModalComps
        destroyOnClose
        title={`分配给${modalData?.roleName}的菜单权限`}
        width={400}
        visible={showTreeFlag}
        onOk={submitEdit}
        onCancel={() => setProperty({ key: 'showTreeFlag', data: false })}
        readOnly={true}
        customFooter={true}
        footer={[
          <Button type="primary" key="submit" onClick={() => submitTree()}>
            提交
          </Button>,
          !expandedKeys.length ? (
            <Button key="all" onClick={() => onExpandAll()}>
              {intl.formatMessage({ id: '10027' })}
            </Button>
          ) : (
            <Button key="allClose" onClick={() => onExpandClose()}>
              {intl.formatMessage({ id: '10028' })}
            </Button>
          ),
          checkedKeys.length ? (
            <Button key="allCheckClose" onClick={() => onCheckClose()}>
              全部取消
            </Button>
          ) : (
            <Button key="allCheck" onClick={() => onCheckAll()}>
              全部选择
            </Button>
          ),
          <Button key="close" onClick={closeShowFlag}>
            取消
          </Button>,
        ]}
      >
        <DialogTree />
      </ModalComps>
    </div>
  )
}

export default withTransition(observer(Role))
