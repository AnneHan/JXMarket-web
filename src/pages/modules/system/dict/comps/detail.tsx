import React, { useRef } from 'react'

import { Button, Popconfirm } from 'antd'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { PlusOutlined } from '@ant-design/icons'
import withTransition from '@/router/withTransitionHoc'

import { useStore, observer } from '@/store'
import { DictItemType } from '@/store/system/dict.store'
import ModalComps from '@/pages/components/modal'
import DictEdit from './edit'

/**
 * 字典详情
 * @param props
 * @returns
 */
const ChannelCustomize: React.FC = (props: any): React.ReactElement => {
  const { dictStore } = useStore()
  const {
    visible,
    dictData,
    submitEdit,
    showEdit,
    getDictDetailList,
    delCodeType,
    setProperty,
    goBock,
  } = dictStore
  const state = props?.location?.state

  const ref = useRef<ActionType>()

  const columns: ProColumns<DictItemType>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
      fixed: 'left',
    },
    {
      title: '字典键值',
      dataIndex: 'code',
      ellipsis: true,
      copyable: true,
      search: false,
      width: 120,
    },
    {
      title: '字典标签',
      dataIndex: 'codename',
      ellipsis: true,
      copyable: true,
      search: false,
      width: 120,
    },
    {
      title: '字典标签英文名',
      dataIndex: 'ecodename',
      ellipsis: true,
      copyable: true,
      search: false,
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
      title: '字典类型',
      dataIndex: 'codetype',
      ellipsis: true,
      copyable: true,
      width: 120,
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 80,
      render: (text, record, _, action) => [
        <p key="edit" className="cursor-pointer blue" onClick={() => showEdit(action, record)}>
          编辑
        </p>,
        <Popconfirm
          title="您确定要删除此字典吗？"
          onConfirm={() => delCodeType(record, action)}
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
    const msg: any = await getDictDetailList({
      ...params,
      pages: params.current,
      pageSize: params.pageSize,
      codetype: state?.codetype,
    })
    if (!msg) return { success: false }

    return {
      data: msg?.result,
      success: true,
      total: msg?.result?.totalCount,
    }
  }

  return (
    <div className="page bg-white page-padding">
      <div className=" page-title page-title-operation">
        <span className="cursor-pointer" onClick={() => goBock()}>
          <i className="fa fa-angle-left"></i>
          {`${state?.codetypename}详情`}
        </span>
      </div>
      <ProTable<DictItemType>
        className="hyl-table"
        rowKey="acskey"
        columns={columns}
        request={tableRequest}
        search={false}
        actionRef={ref}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        toolbar={{
          actions: [
            <Button key="add" icon={<PlusOutlined />} onClick={() => showEdit(ref.current)}>
              新增字典
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
        title={`${!dictData ? '新增' : '编辑'}字典`}
        width={600}
        visible={visible}
        onOk={submitEdit}
        onCancel={() => setProperty({ key: 'visible', data: false })}
      >
        <DictEdit state={state} />
      </ModalComps>
    </div>
  )
}

export default withTransition(observer(ChannelCustomize))
