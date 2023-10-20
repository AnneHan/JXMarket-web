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
 * 采购单信息新增/编辑页面
 * @returns
 */
const PurchaseInfoEdit: React.FC<IModalChildrenProps> = (props): React.ReactElement => {
  const history = useHistory()
  const location = useLocation()
  const state: IStateProps | any = location.state
  const type = state && state?.type

  const { purchaseInfoStore } = useStore()

  const { purchaseInfoData, submitEdit } = purchaseInfoStore

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
          采购单
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
                name: "supplierId",
                label: "供应商编号",
                initialValue: purchaseInfoData?.supplierId,
                required: true,
              }}
              data={{ max: 10, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入供应商编号' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'purchaseDate',
                label: '采购日期',
                initialValue: purchaseInfoData?.purchaseDate,
                required: true,
              }}
              data={{ max: 10, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入采购日期YYYY-MM-DD' }}
            />
          </Col>

          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'amount',
                label: '金额',
                initialValue: purchaseInfoData?.amount,
                required: true,
              }}
              data={{ max: 11, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入金额' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'payMethod',
                label: '付款方式',
                initialValue: purchaseInfoData?.payMethod,
              }}
              data={{ max: 30, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入付款方式' }}
            />
          </Col>

          <Col span={12}>
            <FormItemInput
              formItem={{
                name: "payStatus",
                label: "付款状态",
                initialValue: purchaseInfoData?.payStatus,
                required: true,
              }}
              data={{ max: 30, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入付款状态' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: "notes",
                label: "备注",
                initialValue: purchaseInfoData?.notes,
                required: true,
              }}
              data={{ max: 500, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入备注' }}
            />
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

export default observer(PurchaseInfoEdit)
