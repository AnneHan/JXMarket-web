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
 * 采购明细新增/编辑页面
 * @returns
 */
const PurchaseDetailEdit: React.FC<IModalChildrenProps> = (props): React.ReactElement => {
  const history = useHistory()
  const location = useLocation()
  const state: IStateProps | any = location.state
  const type = state && state?.type

  const { purchaseDetailStore } = useStore()

  const { purchaseDetailData, submitEdit } = purchaseDetailStore

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
          采购明细
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
                name: "purchaseId",
                label: "采购单编号",
                initialValue: purchaseDetailData?.purchaseId,
                required: true,
              }}
              data={{ max: 50, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入采购单编号' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'goodId',
                label: '商品编号',
                initialValue: purchaseDetailData?.goodId,
                required: true,
              }}
              data={{ max: 50, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入商品编号' }}
            />
          </Col>

          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'quantity',
                label: '数量',
                initialValue: purchaseDetailData?.quantity,
                required: true,
              }}
              data={{ pattern: /^[1-9]\d*$/, message: '请输入整数' }}
              input={{ placeholder: '请输入数量' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'unitPrice',
                label: '单价',
                initialValue: purchaseDetailData?.unitPrice,
                required: true,
              }}
              data={{ pattern: /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/, message: '请输入整数或小数' }}
              input={{ placeholder: '请输入单价' }}
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

export default observer(PurchaseDetailEdit)
