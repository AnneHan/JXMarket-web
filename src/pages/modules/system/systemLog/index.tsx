import React from 'react'
import { Space, Tag } from 'antd'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
import withTransition from '@/router/withTransitionHoc'

import { observer, useStore } from '@/store'
import { SystemLogType } from '@/store/system/systemLog.store'
import InfoModal from './comps/detail'
import ModalComps from '@/pages/components/modal'

/**
 * 系统日志
 * @returns
 */
const SystemLog: React.FC = (): React.ReactElement => {
  const intl = useIntl()
  const { systemLogStore } = useStore()
  const { visible, getSystemLog, showInfoModal, setProperty } = systemLogStore

  const columns: ProColumns<SystemLogType>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
      fixed: 'left',
      search: false,
    },
    {
      title: '操作用户账号',
      dataIndex: 'userid',
      ellipsis: true,
      copyable: true,
      fixed: 'left',
      width: 120,
    },
    {
      title: '操作用户名称',
      dataIndex: 'username',
      ellipsis: true,
      copyable: true,
      width: 120,
    },

    {
      title: '请求类型',
      dataIndex: 'requestType',
      ellipsis: true,
      width: 120,
      valueEnum: {
        GET: {
          text: 'GET',
        },
        POST: {
          text: 'POST',
        },
      },
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_)
      },
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      ellipsis: true,
      copyable: true,
      width: 160,
    },
    {
      title: '操作类型',
      dataIndex: 'operateType',
      ellipsis: true,
      filters: true,
      onFilter: true,
      copyable: true,
      width: 120,
      valueEnum: {
        '0': {
          text: '新增或修改',
        },
        '1': {
          text: '新增',
        },
        '2': {
          text: '删除',
        },
        '3': {
          text: '修改',
        },
        '4': {
          text: '查询',
        },
        '5': {
          text: '登录',
        },
        '6': {
          text: '其他',
        },
      },
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_)
      },
      render: (_, record) => {
        let color = '#ccc',
          name = ''
        switch (record.operateType) {
          case '0':
            color = 'pink'
            name = '新增或修改'
            break
          case '1':
            color = 'green'
            name = '新增'
            break
          case '2':
            color = 'red'
            name = '删除'
            break
          case '3':
            color = 'orange'
            name = '修改'
            break
          case '4':
            color = 'purple'
            name = '查询'
            break
          case '5':
            color = 'blue'
            name = '登录'
            break
          case '6':
            color = 'default'
            name = '其他'
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
      title: '日志类型',
      dataIndex: 'logType',
      ellipsis: true,
      filters: true,
      onFilter: true,
      copyable: true,
      width: 120,
      valueEnum: {
        '0': {
          text: '操作日志',
        },
        '1': {
          text: '登录日志',
        },
      },
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_)
      },
      render: (_, record) => {
        let color = '#ccc',
          name = ''
        switch (record.logType) {
          case '0':
            color = 'pink'
            name = '操作日志'
            break
          case '1':
            color = 'blue'
            name = '登录日志'
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
      title: '日志内容',
      dataIndex: 'logContent',
      ellipsis: true,
      copyable: true,
      width: 160,
    },

    {
      title: '耗时',
      dataIndex: 'costTime',
      width: 120,
      hideInSearch: true,
      render: (text, record, _, action) => [<span>{record.costTime}ms</span>],
    },
    {
      title: '请求java方法',
      dataIndex: 'method',
      ellipsis: true,
      search: false,
      copyable: true,
      width: 200,
    },
    {
      title: '请求路径',
      dataIndex: 'requestUrl',
      ellipsis: true,
      search: false,
      copyable: true,
      width: 200,
    },
    {
      title: '请求参数',
      dataIndex: 'requestParam',
      ellipsis: true,
      search: false,
      copyable: true,
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      // valueType: 'dateTime',
      search: false,
      width: 160,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 90,
      fixed: 'right',
      render: (text, record, _, action) => [
        <p className="cursor-pointer blue" key="see" onClick={() => showInfoModal(record)}>
          查看
        </p>,
      ],
    },
  ]

  const tableRequest = async (params: any, sort: any, filter: any) => {
    const msg: any = await getSystemLog({
      ...params,
      createTime: params.createTime || '',
      logContent: params.logContent || '',
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
      <Helmet title={intl.formatMessage({ id: '10049' }) /* 系统日志 */} />
      <div className="page-title">{intl.formatMessage({ id: '10049' })}</div>
      <ProTable<SystemLogType>
        className="hyl-table"
        columns={columns}
        request={tableRequest}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 100,
          span: 8,
          optionRender: (_, __, dom) => [...dom.reverse()], // 搜索，重置按钮换位置
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        scroll={{ x: 1300 }}
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
        title="查看详情"
        width={700}
        visible={visible}
        onCancel={() => setProperty({ key: 'visible', data: false })}
        readOnly={true}
      >
        <InfoModal />
      </ModalComps>
    </div>
  )
}

export default withTransition(observer(SystemLog))
