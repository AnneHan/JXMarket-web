import React, { useRef } from 'react'
import { Button, Popconfirm, Space, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
import withTransition from '@/router/withTransitionHoc'
import Utils from '@/utils'

import { useStore, observer } from '@/store/index'
import { GoodInventoryItemType } from '@/store/business/inventoryManagement/goodInventory.store'

/**
 * 欣服务资源配置
 * @returns
 */
const GoodInventory: React.FC = (props: any): React.ReactElement => {
  const intl = useIntl()
  const { goodInventoryStore } = useStore()
  const { getGoodInventory, delGoodInventory, showEdit, setProperty } = goodInventoryStore
  const search = Utils.parseQuery(props?.location?.search)
  const actionRef = useRef<ActionType>()

  const columns: ProColumns<GoodInventoryItemType>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
      fixed: 'left',
    },

    {
      title: '商品库存编号',
      dataIndex: 'id',
      ellipsis: true, // 允许宽度伸缩
      copyable: true, // 允许copy
      width: 120,
    },

    {
      title: '商品编号',
      dataIndex: 'goodId',
      ellipsis: true, // 允许宽度伸缩
      copyable: true, // 允许copy
      width: 120,
      hideInSearch: true,
      hideInTable: true,
    },

    {
      title: '商品名称',
      dataIndex: 'goodName',
      ellipsis: true, // 允许宽度伸缩
      copyable: true, // 允许copy
      width: 120,
      hideInSearch: true,
    },

    {
      title: '当前库存数量',
      dataIndex: 'quantity',
      ellipsis: true,
      width: 120,
      hideInSearch: true,
    },
    {
      title: '当前库位商品库存数量',
      dataIndex: 'innerQuantity',
      ellipsis: true,
      width: 140,
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
      width: 80,
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
      ],
    },
  ]

  const tableRequest = async (params: any, sort: any, filter: any) => {
    const msg: any = await getGoodInventory({
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
      <Helmet title={intl.formatMessage({ id: '10038' }) /* 客户 */} />
      <div className="page-title">{intl.formatMessage({ id: '10038' })}</div>

      <ProTable<GoodInventoryItemType>
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
        /*dateFormatter="string"
        toolbar={{
          actions: [
            <Button key="add" icon={<PlusOutlined />} onClick={() => showEdit()}>
              添加客户
            </Button>,
          ],
        }}*/
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

export default withTransition(observer(GoodInventory))
