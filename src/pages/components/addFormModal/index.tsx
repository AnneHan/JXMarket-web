import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { observer } from '@/store'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { IModalChildrenProps } from '@type/index'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
}
/**
 * 添加input框弹窗
 * @returns
 */
const AddFormMadol: React.FC<IModalChildrenProps> = props => {
  const [form] = Form.useForm()

  useEffect(() => {
    // 1. 支持 modal 确认按钮提交form
    props?.onModalForm?.(form)
  }, [])

  return (
    <Form name="emailRecord" scrollToFirstError className="m-t-20 hyl-input-add" form={form}>
      <Form.List name="toAddress" initialValue={['']}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '收件地址' : ''}
                required={false}
                key={field.key}
                className="hyl-input"
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入收件地址',
                    },
                  ]}
                  noStyle
                >
                  <Input
                    type="email"
                    placeholder="请输入收件地址"
                    style={{ width: '85%' }}
                    allowClear
                  />
                </Form.Item>

                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            {fields.length < 10 ? (
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '85%' }}
                  icon={<PlusOutlined />}
                >
                  添加收件地址
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            ) : null}
          </>
        )}
      </Form.List>
    </Form>
  )
}

export default observer(AddFormMadol)
