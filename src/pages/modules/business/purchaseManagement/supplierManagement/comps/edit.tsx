import React, { useEffect } from 'react'
import {Col, Form, Row, Select, Button, DatePicker} from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { observer, useStore } from '@/store'
import { ECrudType, IModalChildrenProps } from '@type/index.d'

import FormItemInput from '@/pages/components/inputClear'
import moment from "moment";

const { Option } = Select

interface IStateProps {
  type?: ECrudType.add | ECrudType.edit | undefined | null
}

/**
 * 供应商信息新增/编辑页面
 * @returns
 */
const SupplierManagementEdit: React.FC<IModalChildrenProps> = (props): React.ReactElement => {
  const history = useHistory()
  const location = useLocation()
  const state: IStateProps | any = location.state
  const type = state && state?.type

  const { supplierManagementStore } = useStore()

  const { supplierManagementData, submitEdit } = supplierManagementStore

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }

  const [form] = Form.useForm()

  useEffect(() => {
    // 1. 支持 modal 确认按钮提交form
    props?.onModalForm?.(form)
  }, [])

  return (
    <div className="page bg-white page-padding">
      <div className="page-title page-title-operation">
        <span className="cursor-pointer" onClick={history.goBack}>
          <i className="fa fa-angle-left"></i>
          {type === ECrudType.add ? '新增' : type === ECrudType.edit ? '编辑' : ''}
          供应商
        </span>
      </div>
      <Form
        {...formItemLayout}
        onFinish={value => submitEdit(value)}
        scrollToFirstError
        className="m-t-20"
        form={form}
      >
        <Row gutter={24}>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: "name",
                label: "供应商名称",
                initialValue: supplierManagementData?.name,
                required: true,
              }}
              data={{ max: 50, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入供应商名称' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'contactPer',
                label: '联系人',
                initialValue: supplierManagementData?.contactPer,
                required: true,
              }}
              data={{ max: 50, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入联系人' }}
            />
          </Col>

          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'tel',
                label: '电话',
                initialValue: supplierManagementData?.tel,
                required: true,
              }}
              data={{ pattern: /^\d{0,20}$/, message: '电话号输入有误或超过最大字数。' }}
              input={{ placeholder: '请输入电话' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'email',
                label: '电子邮箱',
                initialValue: supplierManagementData?.email,
              }}
              data={{ pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: '请正确输入电子邮箱' }}
              input={{ placeholder: '请输入备注' }}
            />
          </Col>

          <Col span={12}>
            <FormItemInput
              formItem={{
                name: "fax",
                label: "传真",
                initialValue: supplierManagementData?.fax,
                required: true,
              }}
              data={{ max: 30, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入传真' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'address',
                label: '地址',
                initialValue: supplierManagementData?.address,
                required: true,
              }}
              data={{ max: 500, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入地址' }}
            />
          </Col>

          <Col span={12}>
            <Form.Item
              name="status"
              label="状态"
              rules={[
                {
                  required: true,
                  message: '请选择状态',
                },
              ]}
              initialValue={supplierManagementData?.status}
            >
              <Select allowClear placeholder="请选择状态">
                <Option value={true}>启用</Option>
                <Option value={false}>禁用</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button className="m-l-20" onClick={history.goBack}>
              返回
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default observer(SupplierManagementEdit)
