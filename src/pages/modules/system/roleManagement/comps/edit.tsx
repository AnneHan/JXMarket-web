import React, { useEffect } from 'react'
import { Form, Row, Col } from 'antd'
import { IModalChildrenProps } from '@type/index'

import { observer, useStore } from '@/store'
import styles from './index.module.scss'
import FormItemInput from '@/pages/components/inputClear'

/**
 * 角色管理 新增/编辑
 * @param props
 * @returns
 */
const RoleListModal: React.FC<IModalChildrenProps> = (props): React.ReactElement => {
  const { roleStore } = useStore()
  const { modalData } = roleStore

  const [form] = Form.useForm()

  useEffect(() => {
    // 1. 支持 modal 确认按钮提交form
    props?.onModalForm?.(form)
  }, [])

  return (
    <div className={styles.updateRoleList}>
      <Form
        name="register"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        scrollToFirstError
        form={form}
      >
        <Row gutter={24}>
          <Col span={24}>
            <FormItemInput
              formItem={{
                name: 'roleName',
                label: '角色名称',
                initialValue: modalData?.roleName,
                required: true,
              }}
              input={{ placeholder: '请输入角色名称' }}
            />
          </Col>

          <Col span={24}>
            <FormItemInput
              formItem={{
                name: 'roleCode',
                label: '角色code',
                initialValue: modalData?.roleCode,
                required: true,
              }}
              input={{ placeholder: '请输入角色code' }}
            />
          </Col>
          <Col span={24}>
            <FormItemInput
              formItem={{
                name: 'description',
                label: '角色信息',
                initialValue: modalData?.description,
                required: true,
              }}
              input={{ placeholder: '请输入角色信息' }}
            />
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default observer(RoleListModal)
