import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space, Tag, Image, Dropdown, Menu } from 'antd'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
import { EStatus } from '@type/index.d'
import withTransition from '@/router/withTransitionHoc'

import { observer, useStore } from '@/store'
import { UserItem } from '@/store/system/userManagement.store'
import styles from './comps/index.module.scss'
import TagComp from '@/pages/components/tag/tag'

const { status } = EStatus

/**
 * 用户管理
 * @param props
 * @returns
 */
const UserManagement: React.FC = (props): React.ReactElement => {
  const intl = useIntl()
  const { userStore } = useStore()
  const { getUserList, delUserList, showEdit, resetUserList, updateUserStatus } = userStore

  const columns: ProColumns<UserItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
      fixed: 'left',
      search: false,
    },
    {
      title: '登录账号',
      dataIndex: 'username',
      ellipsis: true,
      fixed: 'left',
      width: 120,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      ellipsis: true,
      width: 120,
    },
    {
      title: '电子邮箱',
      dataIndex: 'email',
      ellipsis: true,
      width: 160,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 120,
      copyable: true, // 允许copy
      search: false,
      render: (_, record) =>
        record.avatar ? <Image className="table-td-img" src={record.avatar} /> : '-',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      ellipsis: true,
      search: false,
      width: 120,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      ellipsis: true,
      filters: true,
      onFilter: true,
      width: 120,
      valueEnum: {
        true: {
          text: '男',
        },
        false: {
          text: '女',
        },
      },
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_)
      },
      render: (_, record) => {
        let color = '#ccc',
          name = ''
        switch (record.sex) {
          case true:
            color = 'blue'
            name = '男'
            break
          case false:
            color = 'pink'
            name = '女'
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
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      width: 120,
      valueEnum: {
        true: {
          text: '正常',
        },
        false: {
          text: '冻结',
        },
      },
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_)
      },
      render: (_, record) => <TagComp status={record.status} statusList={status} />,
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      // valueType: 'dateTime',
      width: 160,
      hideInSearch: true,
    },

    {
      title: '更新时间',
      dataIndex: 'updateTime',
      // valueType: 'dateTime',
      width: 160,
      hideInSearch: true,
    },

    {
      title: '操作',
      valueType: 'option',
      width: 170,
      fixed: 'right',
      render: (text, record, _, action) => [
        <p className="cursor-pointer blue" key="editable" onClick={() => showEdit(record)}>
          编辑
        </p>,
        <Popconfirm
          title="您确定要重置密码吗？"
          onConfirm={() => resetUserList(record.id)}
          onCancel={() => {}}
          okText="确定"
          cancelText="取消"
          key="PopconfirmReset"
        >
          <p className="cursor-pointer blue" key="reset">
            重置密码
          </p>
        </Popconfirm>,
        <Dropdown
          key="dropdown"
          overlay={
            <Menu
              items={[
                record.status
                  ? {
                      key: 'frozen1',
                      label: (
                        <Popconfirm
                          title="您确定要冻结此用户吗？"
                          onConfirm={() => updateUserStatus(record.id, action, false)}
                          onCancel={() => {}}
                          okText="确定"
                          cancelText="取消"
                          key="Popconfrozen"
                        >
                          <p
                            className={`cursor-pointer blue ${styles.dropdownFontSize}`}
                            key="frozen"
                          >
                            冻结
                          </p>
                        </Popconfirm>
                      ),
                    }
                  : {
                      key: 'thaw1',
                      label: (
                        <Popconfirm
                          title="您确定要解除冻结状态吗？"
                          onConfirm={() => updateUserStatus(record.id, action, true)}
                          onCancel={() => {}}
                          okText="确定"
                          cancelText="取消"
                          key="Popconfirmthaw"
                        >
                          <p
                            className={`cursor-pointer blue ${styles.dropdownFontSize}`}
                            key="thaw"
                          >
                            解除冻结
                          </p>
                        </Popconfirm>
                      ),
                    },
                {
                  key: 'del',
                  label: (
                    <Popconfirm
                      title="您确定要删除此用户吗？"
                      onConfirm={() => delUserList(record.id, action)}
                      onCancel={() => {}}
                      okText="确定"
                      cancelText="取消"
                      key="Popcondelete"
                      placement="leftTop"
                    >
                      <p className={`cursor-pointer blue ${styles.dropdownFontSize}`} key="delete">
                        删除
                      </p>
                    </Popconfirm>
                  ),
                },
              ]}
            />
          }
          placement="bottomLeft"
        >
          <span className="cursor-pointer blue" key="more">
            更多
          </span>
        </Dropdown>,
      ],
    },
  ]

  const tableRequest = async (params: any, sort: any, filter: any) => {
    const msg: any = await getUserList({
      ...params,
      username: params.username || '',
      pages: params.current,
      pageSize: params.pageSize,
      sex: params?.sex && JSON.parse(params.sex),
      status: params?.status && JSON.parse(params.status),
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
      <Helmet title={intl.formatMessage({ id: '10023' }) /* 用户 */} />
      <div className="page-title">{intl.formatMessage({ id: '10023' })}</div>
      <ProTable<UserItem>
        className="hyl-table"
        columns={columns}
        request={tableRequest}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 80,
          span: 8,
          optionRender: (_, __, dom) => [...dom.reverse()], // 搜索，重置按钮换位置
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        scroll={{ x: 1300 }}
        dateFormatter="string"
        toolbar={{
          actions: [
            <Button key="add" icon={<PlusOutlined />} onClick={() => showEdit()}>
              添加用户
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

export default withTransition(observer(UserManagement))
