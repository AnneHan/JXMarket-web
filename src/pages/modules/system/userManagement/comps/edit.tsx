import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import moment from 'moment'

import { ECrudType } from '@/store/base.store'
import { observer, useStore } from '@/store'
import RoleModal from './roleModal'
import UploadComp from '@/pages/components/upload'
import { uploadAvatarApi } from '@/utils/http/api'
import styles from './index.module.scss'
import ModalComps from '@/pages/components/modal'
import FormItemInput from '@/pages/components/inputClear'

const { Option } = Select

interface IStateProps {
  type?: ECrudType.add | ECrudType.edit | undefined | null
}

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 16 },
  },
}

/**
 * 用户编辑/新增页面
 * @returns
 */
const RoleListModal: React.FC = (): React.ReactElement => {
  const history = useHistory()
  const location = useLocation()
  const state: IStateProps | any = location.state
  const type = state && state?.type
  const { userStore, commonStore } = useStore()
  const { modalData, visible, setProperty, handleOk, showModal, submitEdit } = userStore

  const [form] = Form.useForm()

  const dateValue =
    modalData && typeof modalData.birthday === 'string'
      ? moment(modalData.birthday)
      : modalData?.birthday

  const disabledDate = (current: any) => {
    return current && current > moment().subtract('days') //当天之前的不可选，不包括当天
  }

  return (
    <div className="page bg-white page-padding">
      <div className="page-title page-title-operation">
        <span className="cursor-pointer" onClick={history.goBack}>
          <i className="fa fa-angle-left"></i>
          {type === ECrudType.add ? '新增' : type === ECrudType.edit ? '编辑' : ''}
          用户
        </span>
      </div>
      <div className={`card-title ${styles.cartTitle}`}> 账号信息 </div>
      <Form
        name="register"
        {...formItemLayout}
        onFinish={submitEdit}
        form={form}
        scrollToFirstError
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              className="hyl-input"
              name="username"
              label="登录账号"
              initialValue={modalData?.username}
              rules={[
                {
                  required: true,
                  pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
                  message: '字母开头，允许5-16字节，允许字母数字下划线',
                },
              ]}
            >
              <Input
                placeholder="请输入登录账号"
                allowClear
                readOnly={type === ECrudType.add ? false : true}
              />
            </Form.Item>
          </Col>
          {type === ECrudType.add ? (
            <Col span={8}>
              <Form.Item
                className="hyl-input"
                name="password"
                label="密码"
                initialValue={modalData?.password}
                rules={[
                  {
                    required: true,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,10}$/,
                    message: '包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间',
                  },
                ]}
              >
                <Input.Password allowClear placeholder="请输入密码" />
              </Form.Item>
            </Col>
          ) : (
            <></>
          )}
          <Col span={8}>
            <Form.Item
              name="roleName"
              label="角色"
              initialValue={modalData?.role?.roleName}
              rules={[
                {
                  required: true,
                  message: '请选择角色',
                },
              ]}
            >
              <Input allowClear placeholder="请选择角色" onClick={() => showModal(form)} readOnly />
            </Form.Item>
          </Col>
        </Row>
        <div className={`card-title ${styles.cartTitle}`}> 基本信息 </div>
        <Row gutter={24}>
          <Col span={8}>
            <FormItemInput
              formItem={{
                name: 'phone',
                label: '电话',
                initialValue: modalData?.phone,
              }}
              data={{ pattern: /^\d{0,20}$/, message: '电话号输入有误或超过最大字数。' }}
              input={{ placeholder: '请输入电话' }}
            />
          </Col>
          <Col span={8}>
            <Form.Item
              name="email"
              className="hyl-input"
              label="电子邮箱"
              initialValue={modalData?.email}
              rules={[
                {
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: '请正确输入电子邮箱',
                },
              ]}
            >
              <Input type="email" placeholder="请输入电子邮箱" allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="birthday" label="生日" initialValue={dateValue}>
              <DatePicker
                className="user-picker"
                placeholder="请选择生日日期"
                disabledDate={disabledDate}
                showToday={false}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="sex" label="性别" initialValue={modalData?.sex}>
              <Select placeholder="请选择性别" allowClear>
                <Option value={true}>男</Option>
                <Option value={false}>女</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="status"
              label="状态"
              initialValue={modalData?.status}
              rules={[
                {
                  required: true,
                  message: '请选择状态',
                },
              ]}
            >
              <Select placeholder="请选择状态" allowClear>
                <Option value={true}>正常</Option>
                <Option value={false}>冻结</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <div className={`card-title ${styles.cartTitle}`}> 头像 </div>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="avatar" label="头像" initialValue={modalData?.avatar}>
              <UploadComp api={uploadAvatarApi} length={1} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ span: 24, offset: 10 }}>
          <Button type="primary" className="m-r-20" htmlType="submit">
            提交
          </Button>
          <Button onClick={commonStore.back}>返回</Button>
        </Form.Item>
      </Form>
      <ModalComps
        destroyOnClose
        title="选择角色"
        width={'75%'}
        visible={visible}
        onOk={handleOk}
        onCancel={() => setProperty({ key: 'visible', data: false })}
      >
        <RoleModal />
      </ModalComps>
    </div>
  )
}

export default observer(RoleListModal)
