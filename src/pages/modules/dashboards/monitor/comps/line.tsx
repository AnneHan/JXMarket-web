import React from 'react'
import { Card } from 'antd'
import { Line } from '@ant-design/plots'
import styles from '../index.module.scss'

const DemoLine: React.FC = (): React.ReactElement => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ]
  const config = {
    data,
    height: 300,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  }
  return (
    <div className={`col-6 card-wrap`}>
      <Card className={styles.chartLineH}>
        <div className={styles.chartWrap}>
          <Line {...config} />
        </div>
      </Card>
    </div>
  )
}
export default DemoLine
