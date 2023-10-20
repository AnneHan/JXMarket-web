import React from 'react'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
import { Avatar, Button, Card, Col, Form, Input, Row, Select, Tabs } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import withTransition from '@/router/withTransitionHoc'

import { useStore, observer } from '@/store/index'
import Utils, { KEY } from '@/utils'
import styles from './index.module.scss'
import UploadCrop from '@comps/upload/uploadCrop'
import { uploadAvatarApi } from '@/utils/http/api'
import FormItemInput from '@/pages/components/inputClear'

const { TabPane } = Tabs
const { Option } = Select

const PersonalCenter: React.FC<IRouterProps> = (props: IRouterProps): React.ReactElement => {
  const { personalStore } = useStore()
  const intl = useIntl()
  const info = Utils.getLocal(KEY.USERINFO)

  const { avater, submitInfoEdit, submitEdit, uploadAvater } = personalStore

  return (
    <div className="page">
      <Helmet title={intl.formatMessage({ id: 'personalCenter' }) /* 登录 */} />
      <Row gutter={24} className="personal-row">
        <Col span={9}>
          <Card className="personal-upload" title="关于我" style={{ width: '100%' }}>
            <div className={styles.info}>
              <div className={styles.avatar}>
                <div className={styles.avaterTxt}>
                  <Form onFieldsChange={uploadAvater}>
                    <Form.Item name="avater">
                      <UploadCrop
                        api={uploadAvatarApi}
                        preview={false}
                        length={1}
                        cropProps={{
                          shape: 'round',
                          rotate: true,
                          modalTitle: '修改头像',
                          modalOk: '提交',
                          modalCancel: '取消',
                        }}
                      />
                    </Form.Item>
                    <span className={styles.avaterText}>更改头像</span>
                  </Form>
                </div>
                {/* @ts-ignore */}
                <Avatar src={avater || info?.avatar} size={100} icon={<UserOutlined />} />
              </div>
              <p className={styles.infoName}>{info?.username}</p>
              <div className={styles.contactInfo}>
                <div>
                  <span>{info?.email || '暂无邮箱'}</span>
                </div>
                <b>·</b>
                <div>
                  <span>{info?.phone || '暂无手机'}</span>
                </div>
              </div>
            </div>
            <div className={styles.describeInfo}>
              <p className={styles.PersonalDescription}>
                <i className="fa fa-address-card-o"></i> <span>个人描述</span>
              </p>
              <p className={styles.describe}>
                {info?.personalDescription || '这家伙很懒，什么都没有留下'}
              </p>
            </div>
          </Card>
        </Col>
        <Col span={15}>
          <Card className="personal-card" style={{ width: '100%' }}>
            <Tabs className="personal-tabs" defaultActiveKey="1">
              <TabPane tab="账号信息" key="1">
                <Form
                  name="info"
                  onFinish={submitInfoEdit}
                  labelCol={{ span: 4 }}
                  scrollToFirstError
                >
                  <Form.Item
                    name="username"
                    label="用户名"
                    initialValue={info?.username}
                    rules={[
                      {
                        required: true,
                        message: '请输入用户名',
                      },
                    ]}
                  >
                    <Input readOnly />
                  </Form.Item>

                  <Form.Item
                    className="hyl-input"
                    name="email"
                    label="邮箱"
                    initialValue={info?.email}
                    rules={[
                      {
                        required: false,
                        max: 32,
                        message: '请输入正确格式的邮箱',
                      },
                    ]}
                  >
                    <Input type="email" allowClear placeholder="请输入邮箱" />
                  </Form.Item>

                  <FormItemInput
                    formItem={{
                      name: 'phone',
                      label: '电话',
                      initialValue: info?.phone,
                      required: true,
                    }}
                    data={{
                      message: '请输入电话',
                    }}
                  />

                  <Form.Item
                    name="sex"
                    label="性别"
                    initialValue={info?.sex}
                    rules={[
                      {
                        required: true,
                        message: '请选择性别',
                      },
                    ]}
                  >
                    <Select allowClear placeholder="请选择性别">
                      <Option value={true}>男</Option>
                      <Option value={false}>女</Option>
                    </Select>
                  </Form.Item>

                  <FormItemInput
                    formItem={{
                      name: 'personalDescription',
                      label: '个人描述',
                      initialValue: info?.personalDescription,
                    }}
                    data={{
                      type: true,
                    }}
                  />

                  <Form.Item wrapperCol={{ span: 24, offset: 10 }}>
                    <Button type="primary" className="m-r-20" htmlType="submit">
                      修改
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="个人密码" key="2">
                <Form
                  name="register"
                  onFinish={submitEdit}
                  labelCol={{ span: 4 }}
                  scrollToFirstError
                >
                  <FormItemInput
                    formItem={{
                      name: 'oldPassword',
                      label: '旧密码',
                      required: true,
                    }}
                    data={{
                      password: true,
                      message: '请输入旧密码',
                    }}
                  />

                  <FormItemInput
                    formItem={{
                      name: 'password',
                      label: '新密码',
                      required: true,
                    }}
                    data={{
                      password: true,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,10}$/,
                      message: '包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间',
                    }}
                  />

                  <FormItemInput
                    formItem={{
                      name: 'passwordRepeat',
                      label: '确认密码',
                      required: true,
                    }}
                    data={{
                      password: true,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,10}$/,
                      message: '请正确输入确认密码',
                    }}
                  />

                  <Form.Item wrapperCol={{ span: 24, offset: 10 }}>
                    <Button type="primary" className="m-r-20" htmlType="submit">
                      修改
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default withTransition(observer(PersonalCenter))
