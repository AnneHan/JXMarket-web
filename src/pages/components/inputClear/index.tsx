import React from 'react'
import { Form, Input } from 'antd'
import type { InputProps, FormItemProps } from 'antd/es'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { InputStatus } from 'antd/lib/_util/statusUtils'
const { TextArea } = Input

type DataType = {
  max?: number
  type?: boolean
  password?: boolean
  pattern?: RegExp
  message?: string
}
type TextAreaProps = {
  size?: SizeType
  autoSize?: boolean | object
  status?: InputStatus
  defaultValue?: string
  maxLength?: number
  showCount?: boolean
  value?: string
  bordered?: boolean
  [key: `data-${string}`]: string
}
interface IFormItemInputProps {
  formItem?: FormItemProps
  input?: InputProps
  textArea?: TextAreaProps
  data?: DataType
}

const FormItemInput = (props: IFormItemInputProps) => {
  const { formItem, input, data, textArea } = props

  return (
    <Form.Item
      {...formItem}
      className="hyl-input"
      rules={[
        {
          required: formItem?.required,
          max: data?.max,
          message: data?.message || input?.placeholder,
          pattern: data?.pattern,
        },
      ]}
    >
      {data?.type ? (
        <TextArea {...textArea} placeholder={input?.placeholder} allowClear />
      ) : data?.password ? (
        <Input.Password {...input} allowClear />
      ) : (
        <Input {...input} allowClear />
      )}
    </Form.Item>
  )
}

FormItemInput.defaultProps = {
  data: {
    password: false,
    type: false,
  },
}

export default FormItemInput
