import React, { useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { useIntl } from 'react-intl'
import { useStore, observer } from '@/store/index'

const LoginForm: React.FC<IRouterProps> = (props: IRouterProps): React.ReactElement => {
  const intl = useIntl()
  const [form] = Form.useForm()
  const { loginStore, layoutStore } = useStore()
  const { onFinish, initAccountHandle } = loginStore

  useEffect(() => {
    initAccountHandle(form.setFieldsValue)
    layoutStore.initLayoutConfig()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={values => onFinish(values, props)}
      className="login-from-wrap"
    >
      <Form.Item
        label={intl.formatMessage({ id: '10007' } /* 账号 */)}
        name="username"
        rules={[{ required: true, message: intl.formatMessage({ id: '10008' } /* 请输入账号 */) }]}
      >
        <Input allowClear placeholder={intl.formatMessage({ id: '10008' } /* 请输入账号 */)} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ id: '10009' } /* 密码 */)}
        name="password"
        rules={[{ required: true, message: intl.formatMessage({ id: '10010' } /* 请输入密码 */) }]}
      >
        <Input.Password
          allowClear
          placeholder={intl.formatMessage({ id: '10010' } /* 请输入密码 */)}
        />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>{intl.formatMessage({ id: '10011' } /* 记住密码 */)}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {intl.formatMessage({ id: '10012' } /* 登录 */)}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(LoginForm)
