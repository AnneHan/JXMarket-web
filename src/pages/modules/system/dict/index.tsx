import React, { useEffect, useRef } from 'react'

import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { PlusOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
import withTransition from '@/router/withTransitionHoc'
import { Button } from 'antd'

import { useStore, observer } from '@/store'
import { DictItemType } from '@/store/system/dict.store'
import ModalComps from '@/pages/components/modal'
import DictEdit from './comps/edit'

/**
 * 码表管理
 * @param props
 * @returns
 */
const CodeTable: React.FC = (props): React.ReactElement => {
  const intl = useIntl()
  const { dictStore } = useStore()
  const { visible, submitEdit, toDetail, showEdit, getDictList, setProperty } = dictStore

  const ref = useRef<ActionType>()

  useEffect(() => {
    setProperty({ key: 'detailData', data: null })
  })

  const columns: ProColumns<DictItemType>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
      fixed: 'left',
    },
    {
      title: '字典类型',
      dataIndex: 'codetype',
      ellipsis: true,
      copyable: true,
      width: 120,
    },
    {
      title: '字典名称',
      dataIndex: 'codetypename',
      ellipsis: true,
      copyable: true,
      width: 120,
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 80,
      render: (text, record) => [
        <p key="detail" className="cursor-pointer blue" onClick={() => toDetail(record)}>
          查看详情
        </p>,
      ],
    },
  ]

  const tableRequest = async (params: any, sort: any, filter: any) => {
    const msg: any = await getDictList({
      ...params,
      pages: params.current,
      pageSize: params.pageSize,
    })
    if (!msg) return { success: false }

    return {
      data: msg?.result?.list,
      success: true,
      total: msg?.result?.size,
    }
  }

  return (
    <div className="page">
      <Helmet title={intl.formatMessage({ id: '10073' }) /* 码表管理 */} />
      <div className="page-title">{intl.formatMessage({ id: '10073' })}</div>
      <ProTable<DictItemType>
        className="hyl-table"
        rowKey="codetype"
        columns={columns}
        request={tableRequest}
        search={{
          span: 8,
          labelWidth: 100,
          optionRender: (_, __, dom) => [...dom.reverse()], // 搜索，重置按钮换位置
        }}
        pagination={{
          pageSize: 10,
        }}
        actionRef={ref}
        toolbar={{
          actions: [
            <Button key="add" icon={<PlusOutlined />} onClick={() => showEdit(ref.current)}>
              新增字典
            </Button>,
          ],
        }}
        dateFormatter="string"
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
        title="新增字典"
        width={600}
        visible={visible}
        onOk={submitEdit}
        onCancel={() => setProperty({ key: 'visible', data: false })}
      >
        <DictEdit />
      </ModalComps>
    </div>
  )
}

export default withTransition(observer(CodeTable))
