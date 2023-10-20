import React from 'react'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
import { Statistic, Avatar, Tooltip, Rate, Progress } from 'antd'
import ProCard from '@ant-design/pro-card'
import { observer } from '@/store/index'
import Line from './comps/line'
import styles from './index.module.scss'

const Monitor: React.FC<IRouterProps> = (props: IRouterProps): React.ReactElement => {
  const intl = useIntl()
  return (
    <>
      <Helmet title={intl.formatMessage({ id: '10017' }) /* 监控页 */} />
      <ProCard gutter={8} ghost>
        <ProCard colSpan={6} layout="default" bordered>
          <div className={`${styles.center} ${styles.proCardHeader}`}>
            <p>
              <i className="fa fa-users" aria-hidden="true"></i>
            </p>
          </div>
          <div className={`${styles.center} ${styles.proCardNumber}`}>21.2 k</div>
          <div className={styles.center}>总访问人数</div>
          <div className={`${styles.center} ${styles.proCardFooter}`}>
            <Avatar.Group>
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{ backgroundColor: '#87d068' }}
                  icon={<i className="fa fa-gg-circle" aria-hidden="true"></i>}
                />
              </Tooltip>
              <Avatar
                style={{ backgroundColor: '#1890ff' }}
                icon={<i className="fa fa-gg-circle" aria-hidden="true"></i>}
              />
            </Avatar.Group>
          </div>
        </ProCard>
        <ProCard colSpan={6} layout="default" bordered>
          <div className={`${styles.center} ${styles.proCardHeader}`}>
            <p className={styles.circle}>
              <i className="fa fa-dot-circle-o"></i>
            </p>
          </div>
          <div className={`${styles.center} ${styles.proCardNumber}`}>1.6 k</div>
          <div className={styles.center}>点击量（近30天）</div>
          <div className={`${styles.center} ${styles.proCardFooter}`}>
            <Statistic
              value={11.28}
              precision={2}
              valueStyle={{ color: '#19be6b' }}
              prefix={<i className="fa fa-angle-up" aria-hidden="true"></i>}
              suffix="%"
            />
          </div>
        </ProCard>
        <ProCard colSpan={6} layout="default" bordered>
          <div className={`${styles.center} ${styles.proCardHeader}`}>
            <p className={styles.plane}>
              <i className="fa fa-paper-plane-o"></i>
            </p>
          </div>
          <div className={`${styles.center} ${styles.proCardNumber}`}>826.0</div>
          <div className={styles.center}>到达量（近30天）</div>
          <div className={`${styles.center} ${styles.proCardFooter}`}>
            <Statistic
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<i className="fa fa-angle-down" aria-hidden="true"></i>}
              suffix="%"
            />
          </div>
        </ProCard>
        <ProCard colSpan={6} layout="default" bordered>
          <div className={`${styles.center} ${styles.proCardHeader}`}>
            <p className={styles.justify}>
              <i className="fa fa-align-justify"></i>
            </p>
          </div>
          <div className={`${styles.center} ${styles.proCardNumber}`}>28.8 %</div>
          <div className={styles.center}>转化率（近30天）</div>
          <div className={`${styles.center} ${styles.proCardFooter}`}>
            <Statistic
              value={11.28}
              precision={2}
              valueStyle={{ color: '#19be6b' }}
              prefix={<i className="fa fa-angle-up" aria-hidden="true"></i>}
              suffix="%"
            />
          </div>
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8} ghost>
        <ProCard title="最近1小时访问情况" bordered headerBordered layout="default">
          <Line />
        </ProCard>
        <ProCard colSpan={6} direction="column" gutter={8} ghost bordered>
          <ProCard title="当前在线" layout="default" bordered headerBordered>
            <div className={styles.proCardCenter}></div>
          </ProCard>
          <ProCard
            title="当前活跃度"
            layout="default"
            style={{ marginTop: 8 }}
            bordered
            headerBordered
          >
            <div className={styles.proCardCenter}></div>
          </ProCard>
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8} ghost>
        <ProCard title="平均评价" bordered layout="default" headerBordered>
          <div className={styles.monitorFooter}>
            <div>
              <span>4.5</span>
              <Rate allowHalf defaultValue={2.5} />
            </div>
            <p>
              <span>- 0.0%</span>当前评价没有任何波动
            </p>
            <div>
              <Progress percent={90} />
              <Progress percent={70} />
              <Progress percent={50} />
              <Progress percent={30} />
              <Progress percent={10} />
            </div>
          </div>
        </ProCard>
        <ProCard
          title="客户满意度"
          colSpan={6}
          direction="column"
          gutter={8}
          bordered
          headerBordered
        >
          <div className={styles.monitorFooter}>
            <div className={styles.satisfaction}>
              <span>856</span>
              <p>正面评论</p>
              <span>82%</span>
            </div>
            <div className={styles.satisfaction}>
              <span>69</span>
              <p>负面评论</p>
              <span>9%</span>
            </div>
          </div>
        </ProCard>
        <ProCard title="本月目标" colSpan={6} direction="column" gutter={8} bordered headerBordered>
          <div className={styles.monitorFooter}>
            <Progress type="dashboard" percent={75} />
          </div>
        </ProCard>
      </ProCard>
    </>
  )
}

export default observer(Monitor)
