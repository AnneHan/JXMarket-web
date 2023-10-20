import React, { useRef } from 'react'
import { Button, Popconfirm, Space, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
import withTransition from '@/router/withTransitionHoc'
import Utils from '@/utils'

import { useStore, observer } from '@/store/index'
import { SupplierManagementItemType } from '@/store/business/purchaseManagement/supplierManagement.store'

/**
 * 供应商信息
 * @returns
 */
const SupplierManagement: React.FC = (props: any): React.ReactElement => {
  const intl = useIntl()
  const { supplierManagementStore } = useStore()
  const { getSupplierManagement, delSupplierManagement, showEdit, setProperty } = supplierManagementStore
  const search = Utils.parseQuery(props?.location?.search)
  const actionRef = useRef<ActionType>()

  const columns: ProColumns<SupplierManagementItemType>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
      fixed: 'left',
    },

    {
      title: '供应商名称',
      dataIndex: 'name',
      ellipsis: true, // 允许宽度伸缩
      copyable: true, // 允许copy
      width: 120,
    },

    {
      title: '联系人',
      dataIndex: 'contactPer',
      ellipsis: true,
      copyable: true, // 允许copy
      width: 120,
    },
    {
      title: '电话',
      dataIndex: 'tel',
      ellipsis: true,
      width: 140,
      hideInSearch: true,
    },

    {
      title: '电子邮箱',
      dataIndex: 'email',
      ellipsis: true,
      copyable: true, // 允许copy
      width: 140,
      hideInSearch: true,
    },
    {
      title: '传真',
      dataIndex: 'fax',
      ellipsis: true,
      width: 160,
      hideInSearch: true,
    },

    {
      title: '地址',
      dataIndex: 'address',
      ellipsis: true,
      width: 160,
      hideInSearch: true,
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      ellipsis: true,
      filters: true,
      onFilter: true,
      hideInSearch: true,
      width: 100,
      valueEnum: {
        true: {
          text: '启用',
        },
        false: {
          text: '禁用',
        },
      },
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_)
      },
      render: (_, record) => {
        let color = 'blue',
          name = ''
        switch (record.status) {
          case true:
            color = 'green'
            name = '启用'
            break
          case false:
            color = 'red'
            name = '禁用'
            break
        }
        return (
          <Space>
            <Tag color={color} key="tag">
              {name}
            </Tag>
          </Space>
        )
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 160,
      // valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      // valueType: 'dateTime',
      hideInSearch: true,
      width: 160,
    },
    {
      title: '操作',
      width: 120,
      fixed: 'right',
      valueType: 'option',
      render: (text, record, _, action) => [
        <p
          key="editable"
          className="cursor-pointer blue"
          onClick={() => showEdit(record)}
        >
          编辑
        </p>,
        <Popconfirm
          title="您确定要删除此供应商吗？"
          onConfirm={() => delSupplierManagement(record.id, action)}
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
    const msg: any = await getSupplierManagement({
      ...params,
      pages: params.current,
      pageSize: params.pageSize,
      name: params.name || '',
      contactPer: params.contactPer || '',
      flag: 'query',
    })
    if (!msg) return { success: false }

    setProperty({ key: 'datasource', data: msg?.result?.list })

    return {
      data: msg?.result?.list,
      success: true,
      total: msg?.result?.size,
    }
  }

  return (
    <div className="page">
      <Helmet title={intl.formatMessage({ id: '10039' }) /* 供应商 */} />
      <div className="page-title">{intl.formatMessage({ id: '10039' })}</div>

      <ProTable<SupplierManagementItemType>
        className="hyl-table"
        columns={columns}
        actionRef={actionRef}
        pagination={{
          // 分页配置
          pageSize: 10,
          showSizeChanger: true,
        }}
        scroll={{ x: 1300 }}
        request={tableRequest}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          span: 8,
          labelWidth: 100,
          optionRender: (_, __, dom) => [...dom.reverse()], // 搜索，重置按钮换位置
        }}
        dateFormatter="string"
        toolbar={{
          actions: [
            <Button key="add" icon={<PlusOutlined />} onClick={() => showEdit()}>
              添加供应商
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
    </div>
  )
}

export default withTransition(observer(SupplierManagement))
