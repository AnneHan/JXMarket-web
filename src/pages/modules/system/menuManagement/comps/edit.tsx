import React, { useEffect } from 'react'
import { Input, Button, Form, InputNumber, Select } from 'antd'
import { useIntl } from 'react-intl'

import styles from '../index.module.scss'
import { useStore, observer } from '@/store/index'
import { IMenuParent } from '@/store/system/menuManagement.store'

const { Option } = Select
/**
 * 菜单管理右侧编辑
 * @returns
 */
const MenuEdit: React.FC = (): React.ReactElement => {
  const intl = useIntl()
  const { menuStore } = useStore()
  const { parent, typeNum, menuDataItem, getFormRef, submitEdit, reset, chengeMenuType } = menuStore
  const [form] = Form.useForm()

  useEffect(() => {
    getFormRef(form)
  }, [getFormRef, form])

  return (
    <div className={styles.menuEdit}>
      <Form
        name="register"
        form={form}
        labelCol={{ span: 4 }}
        onFinish={submitEdit}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="菜单名称"
          initialValue={menuDataItem.name}
          rules={[
            {
              required: true,
              message: '请输入菜单名称',
            },
          ]}
        >
          <Input placeholder="请输入菜单名称" allowClear />
        </Form.Item>

        <Form.Item
          name="menuType"
          label="菜单类型"
          initialValue={menuDataItem.menuType}
          rules={[
            {
              required: true,
              message: '请输入菜单类型',
            },
          ]}
        >
          <Select
            placeholder="请输入菜单类型"
            onChange={chengeMenuType}
            disabled={menuDataItem.child.length}
            allowClear
          >
            <Option value={0}>一级菜单</Option>
            <Option value={1}>子菜单</Option>
            {/* <Option value={2}>按钮权限</Option> */}
          </Select>
        </Form.Item>

        {(!(menuDataItem.menuType === 0) || (!menuDataItem.child.length && !(typeNum === 0))) &&
        typeNum !== 0 ? (
          <Form.Item
            name="parentId"
            label="上级菜单"
            initialValue={menuDataItem.parentId}
            rules={[
              {
                required: true,
                message: '请输入菜单名称',
              },
            ]}
          >
            <Select placeholder="请选择父级菜单" onChange={chengeMenuType} allowClear>
              {parent?.map((item: IMenuParent) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
        ) : (
          <></>
        )}

        <Form.Item
          name="url"
          label={intl.formatMessage({ id: '10034' })}
          initialValue={menuDataItem?.url}
          rules={[
            {
              required: typeNum === 0 ? false : true,
              message: '请输入url',
            },
          ]}
        >
          <Input placeholder="请输入路径" allowClear />
        </Form.Item>
        <Form.Item
          name="icon"
          label={intl.formatMessage({ id: '10036' })}
          initialValue={menuDataItem.icon}
        >
          <Input placeholder="请输入icon" allowClear />
        </Form.Item>

        <Form.Item name="sortNo" label="排序" initialValue={menuDataItem.sortNo}>
          <InputNumber style={{ width: '100%' }} placeholder="按降序排序" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24, offset: 8 }}>
          <Button type="primary" className="m-r-20" htmlType="submit">
            保存修改
          </Button>
          <Button onClick={() => reset(form)}>重置</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default observer(MenuEdit)
