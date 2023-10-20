import React, { useRef } from 'react'
import { Button, Popconfirm, Space, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
import withTransition from '@/router/withTransitionHoc'
import Utils from '@/utils'

import { useStore, observer } from '@/store/index'
import { PurchaseInfoItemType } from '@/store/business/purchaseManagement/purchaseInfo.store'

/**
 * 采购单信息
 * @returns
 */
const PurchaseInfo: React.FC = (props: any): React.ReactElement => {
  const intl = useIntl()
  const { purchaseInfoStore } = useStore()
  const { getPurchaseInfo, delPurchaseInfo, showEdit, setProperty } = purchaseInfoStore
  const search = Utils.parseQuery(props?.location?.search)
  const actionRef = useRef<ActionType>()

  const columns: ProColumns<PurchaseInfoItemType>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
      fixed: 'left',
    },

    {
      title: '采购单编号',
      dataIndex: 'id',
      ellipsis: true, // 允许宽度伸缩
      width: 120,
    },

    {
      title: '供应商编号',
      dataIndex: 'supplierId',
      ellipsis: true, // 允许宽度伸缩
      width: 120,
      hideInSearch: true,
    },

    {
      title: '供应商名称',
      dataIndex: 'supplierName',
      ellipsis: true,
      copyable: true, // 允许copy
      width: 120,
      hideInSearch: true,
    },
    {
      title: '仓库',
      dataIndex: 'deportId',
      ellipsis: true,
      width: 140,
      hideInSearch: true,
    },

    {
      title: '采购日期',
      dataIndex: 'purchaseDate',
      ellipsis: true,
      copyable: true, // 允许copy
      width: 140,
      hideInSearch: true,
    },
    {
      title: '金额',
      dataIndex: 'amount',
      ellipsis: true,
      width: 160,
      hideInSearch: true,
    },

    {
      title: '付款方式',
      dataIndex: 'payMethod',
      ellipsis: true,
      width: 160,
      hideInSearch: true,
    },
    {
      title: '付款状态',
      dataIndex: 'payStatus',
      ellipsis: true,
      width: 160,
      hideInSearch: true,
    },

    {
      title: '备注',
      dataIndex: 'notes',
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
      title: '采购人',
      dataIndex: 'createBy',
      ellipsis: true,
      width: 160,
      hideInSearch: true,
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
          title="您确定要删除此采购单吗？"
          onConfirm={() => delPurchaseInfo(record.id, action)}
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
    const msg: any = await getPurchaseInfo({
      ...params,
      pages: params.current,
      pageSize: params.pageSize,
      id: params.id || '',
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
      <Helmet title={intl.formatMessage({ id: '10042' }) /* 采购单 */} />
      <div className="page-title">{intl.formatMessage({ id: '10042' })}</div>

      <ProTable<PurchaseInfoItemType>
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
              添加采购单
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

export default withTransition(observer(PurchaseInfo))
