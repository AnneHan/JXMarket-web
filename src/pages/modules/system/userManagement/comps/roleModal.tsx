import React from 'react'
import { Space } from 'antd'
import ProTable, { ProColumns } from '@ant-design/pro-table'

import { observer, useStore } from '@/store'
import { RoleListItem } from '@/store/system/roleManagement.store'

/**
 * 角色选择弹框表格
 * @returns
 */
const WechatMoadl: React.FC = (): React.ReactElement => {
  const { userStore, roleStore } = useStore()
  const { getRoleId } = userStore
  const { getRoleList } = roleStore

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
  ]

  const tableRequest = async (params: any, sort: any, filter: any) => {
    const msg: any = await getRoleList({
      ...params,
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
    <ProTable<RoleListItem>
      className="hyl-table ant-pro-card-no-padding"
      columns={columns}
      pagination={{
        // 分页配置
        pageSize: 5,
        showSizeChanger: true,
      }}
      rowSelection={{
        type: 'radio',
        onChange: ls => {
          getRoleId(ls)
        },
      }}
      request={tableRequest}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
        span: 8,
        optionRender: (_, __, dom) => [...dom.reverse()], // 搜索，重置按钮换位置
      }}
      dateFormatter="string"
      tableAlertRender={({ selectedRowKeys, selectedRows }) => {
        if (!selectedRowKeys.length) return
        return (
          <Space size={24}>
            <span>已选中{selectedRows[0].roleName}</span>
          </Space>
        )
      }}
    />
  )
}

export default observer(WechatMoadl)
