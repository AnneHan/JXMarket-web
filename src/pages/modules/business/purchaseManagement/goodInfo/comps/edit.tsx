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
 * 商品信息新增/编辑页面
 * @returns
 */
const GoodInfoEdit: React.FC<IModalChildrenProps> = (props): React.ReactElement => {
  const history = useHistory()
  const location = useLocation()
  const state: IStateProps | any = location.state
  const type = state && state?.type

  const { goodInfoStore } = useStore()

  const { goodInfoData, submitEdit } = goodInfoStore

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
          商品
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
                label: "商品名称",
                initialValue: goodInfoData?.name,
                required: true,
              }}
              data={{ max: 50, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入商品名称' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'category',
                label: '商品类型',
                initialValue: goodInfoData?.category,
                required: true,
              }}
              data={{ max: 50, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入商品类型' }}
            />
          </Col>

          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'model',
                label: '规格型号',
                initialValue: goodInfoData?.model,
                required: true,
              }}
              data={{ max: 50, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入规格型号' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'unit',
                label: '单位',
                initialValue: goodInfoData?.unit,
                required: true,
              }}
              data={{ max: 50, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入单位' }}
            />
          </Col>

          <Col span={12}>
            <FormItemInput
              formItem={{
                name: "costPrice",
                label: "成本价",
                initialValue: goodInfoData?.costPrice,
                required: true,
              }}
              data={{ max: 11, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入成本价' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: "retailPrice",
                label: "零售价",
                initialValue: goodInfoData?.retailPrice,
                required: true,
              }}
              data={{ max: 11, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入零售价' }}
            />
          </Col>

          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'expiryDate',
                label: '保质期',
                initialValue: goodInfoData?.expiryDate,
              }}
              data={{ max: 20, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入保质期' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'barCode',
                label: '条形码',
                initialValue: goodInfoData?.barCode,
                required: true,
              }}
              data={{ max: 20, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入条形码' }}
            />
          </Col>

          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'supplierId',
                label: '供应商',
                initialValue: goodInfoData?.supplierId,
                required: true,
              }}
              data={{ max: 20, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请选择供应商' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'warnValue',
                label: '库存预警值',
                initialValue: goodInfoData?.warnValue,
                required: true,
              }}
              data={{ max: 20, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入库存预警值' }}
            />
          </Col>

          {/*{type === ECrudType.add ?
            <Col span={12}>
              <FormItemInput
                formItem={{
                  name: 'quantity',
                  label: '库存量',
                  initialValue: goodInfoData?.quantity,
                  required: true,
                }}
                data={{ max: 20, message: '输入为空或超过输入最大长度' }}
                input={{ placeholder: '请输入库存量' }}
              />
            </Col>
            : ''}*/}

          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'shelfNumber',
                label: '所在货架号',
                initialValue: goodInfoData?.shelfNumber,
                required: true,
              }}
              data={{ max: 20, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入所在货架号' }}
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'innerWarnValue',
                label: '库位库存预警值',
                initialValue: goodInfoData?.innerWarnValue,
                required: true,
              }}
              data={{ max: 20, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入库位库存预警值' }}
            />
          </Col>

          <Col span={12}>
            <FormItemInput
              formItem={{
                name: 'notes',
                label: '备注',
                initialValue: goodInfoData?.notes,
                required: true,
              }}
              data={{ max: 20, message: '输入为空或超过输入最大长度' }}
              input={{ placeholder: '请输入备注' }}
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
              initialValue={goodInfoData?.status}
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

export default observer(GoodInfoEdit)
