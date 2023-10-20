import React from 'react'
import { Descriptions } from 'antd'

import { useStore, observer } from '@/store'
import Copy from '@/pages/components/copy'
import './index.module.scss'
import JsonViewer from '@/pages/components/jsonViewer'

/**
 * 系统日志查看详情
 * @returns
 */
const InfoModal: React.FC = (): React.ReactElement => {
  const { systemLogStore } = useStore()
  const { info, type } = systemLogStore
  const reg = /\}$/
  return (
    <Descriptions column={1} bordered size="small" className="system-log">
      <Descriptions.Item label="操作用户账号">
        {info?.userid}
        {info?.userid ? <Copy text={info?.userid} /> : <></>}
      </Descriptions.Item>
      <Descriptions.Item label="操作用户名称">
        {info?.username} {info?.username ? <Copy text={info?.username} key="username" /> : <></>}
      </Descriptions.Item>
      <Descriptions.Item label="请求类型">{info?.requestType}</Descriptions.Item>
      <Descriptions.Item label="IP">
        {info?.ip}
        <Copy text={info?.ip} key="ip" />
      </Descriptions.Item>
      <Descriptions.Item label="操作类型">{type(info?.operateType)}</Descriptions.Item>
      <Descriptions.Item label="日志类型">
        {info?.logType === '0' ? '操作日志' : info?.logType === '1' ? '登录日志' : '-'}
      </Descriptions.Item>
      <Descriptions.Item label="日志内容">
        {info?.logContent}
        <Copy text={info?.logContent} key="logContent" />
      </Descriptions.Item>
      <Descriptions.Item label="耗时">{info?.costTime}ms</Descriptions.Item>
      <Descriptions.Item label="请求java方法">
        {info?.method}
        <Copy text={info?.method} key="method" />
      </Descriptions.Item>
      <Descriptions.Item label="请求路径">
        {info?.requestUrl}
        <Copy text={info?.requestUrl} key="requestUrl" />
      </Descriptions.Item>
      <Descriptions.Item label="创建时间">{info?.createTime}</Descriptions.Item>
      <Descriptions.Item
        label={
          <p>
            <span>请求参数</span>
            {info?.requestParam ? <Copy text={info?.requestParam} key="requestParam" /> : <></>}
          </p>
        }
      >
        {reg.test(info?.requestParam) ? (
          <div className="last-item json">
            <JsonViewer json={info?.requestParam} />
          </div>
        ) : (
          <div className="last-item">{info?.requestParam}</div>
        )}
      </Descriptions.Item>
    </Descriptions>
  )
}

export default observer(InfoModal)
