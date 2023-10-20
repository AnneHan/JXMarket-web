import React, { useEffect } from 'react'
import { Form, Select, InputNumber } from 'antd'
import { useIntl } from 'react-intl'

import { useStore, observer } from '@/store/index'
import { IMenuParent } from '@/store/system/menuManagement.store'
import { IModalChildrenProps } from '@type/index'
import FormItemInput from '@/pages/components/inputClear'

const { Option } = Select

/**
 * 菜单管理新增
 * @param props
 * @returns
 */
const AddMenu: React.FC<IModalChildrenProps> = (props): React.ReactElement => {
  const intl = useIntl()
  const { menuStore } = useStore()
  const { parent, typeNum, handleOk, chengeMenuType } = menuStore

  const [form] = Form.useForm()

  useEffect(() => {
    // 1. 支持 modal 确认按钮提交form
    props?.onModalForm?.(form)
  }, [])

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 17 }}
      onFinish={handleOk}
      scrollToFirstError
    >
      <FormItemInput
        formItem={{
          name: 'name',
          label: '菜单名称',
          required: true,
        }}
        input={{ placeholder: '请输入菜单名称' }}
      />

      <Form.Item
        name="menuType"
        label="菜单类型"
        rules={[
          {
            required: true,
            message: '请输入菜单类型',
          },
        ]}
      >
        <Select placeholder="请输入菜单类型" onChange={chengeMenuType} allowClear>
          <Option value={0}>一级菜单</Option>
          <Option value={1}>子菜单</Option>
        </Select>
      </Form.Item>

      {typeNum === 0 ? (
        <></>
      ) : (
        <Form.Item
          name="parentId"
          label="上级菜单"
          rules={[
            {
              required: true,
              message: '请选择上级菜单',
            },
          ]}
        >
          <Select placeholder="请选择上级菜单" onChange={chengeMenuType} allowClear>
            {parent?.map((item: IMenuParent) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
      )}

      <FormItemInput
        formItem={{
          name: 'url',
          label: intl.formatMessage({ id: '10034' }),
          required: typeNum === 0 ? false : true,
        }}
        input={{ placeholder: '请输入路径' }}
      />

      <FormItemInput
        formItem={{
          name: 'icon',
          label: intl.formatMessage({ id: '10036' }),
        }}
        input={{ placeholder: '请输入icon' }}
      />

      <Form.Item name="sortNo" label="排序">
        <InputNumber style={{ width: '100%' }} placeholder="按降序排序" />
      </Form.Item>
    </Form>
  )
}
export default observer(AddMenu)
