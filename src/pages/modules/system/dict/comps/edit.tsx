import React, { useEffect } from 'react'
import { Form, Row, Col } from 'antd'
import { IModalChildrenProps } from '@type/index'

import { observer, useStore } from '@/store'
import styles from '../index.module.scss'
import FormItemInput from '@/pages/components/inputClear'

/**
 * 字典详情 新增/编辑
 * @param props
 * @returns
 */
const DictListModal: React.FC<IModalChildrenProps> = (props: any): React.ReactElement => {
  const { dictStore } = useStore()
  const { dictData } = dictStore
  const { state } = props
  const [form] = Form.useForm()

  useEffect(() => {
    // 1. 支持 modal 确认按钮提交form
    props?.onModalForm?.(form)
  }, [])

  return (
    <div className={styles.updateRoleList}>
      <Form
        name="register"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 15 }}
        scrollToFirstError
        form={form}
      >
        <Row gutter={24}>
          <Col span={24}>
            <FormItemInput
              formItem={{
                name: 'codetype',
                label: '字典类型',
                initialValue: dictData?.codetype || state?.codetype,
                required: true,
              }}
              input={{
                placeholder: '请输入字典类型',
                disabled: dictData?.codetype || state?.codetype ? true : false,
              }}
            />
          </Col>

          <Col span={24}>
            <FormItemInput
              formItem={{
                name: 'codetypename',
                label: '字典名称',
                initialValue: dictData?.codetypename || state?.codetypename,
                required: true,
              }}
              input={{
                placeholder: '请输入字典名称',
                disabled: dictData?.codetype || state?.codetypename ? true : false,
              }}
            />
          </Col>
          <Col span={24}>
            <FormItemInput
              formItem={{
                name: 'code',
                label: '字典键值',
                initialValue: dictData?.code,
                required: true,
              }}
              input={{ placeholder: '请输入字典键值' }}
            />
          </Col>
          <Col span={24}>
            <FormItemInput
              formItem={{
                name: 'codename',
                label: '字典标签',
                initialValue: dictData?.codename,
                required: true,
              }}
              input={{ placeholder: '请输入字典标签' }}
            />
          </Col>
          <Col span={24}>
            <FormItemInput
              formItem={{
                name: 'ecodename',
                label: '字典标签英文名',
                initialValue: dictData?.ecodename,
              }}
              input={{ placeholder: '请输入字典标签英文名' }}
            />
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default observer(DictListModal)
