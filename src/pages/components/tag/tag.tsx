import React from 'react'
import { Tag, Space } from 'antd'

interface ITagProps {
  status: any
  statusList: any
}

const TagComp: React.FC<ITagProps> = (props: ITagProps): React.ReactElement => {
  let color = '',
    name = ''

  props?.statusList.forEach((item: any) => {
    switch (props.status) {
      case item.key:
        color = item.color
        name = item.name
        break
    }
  })

  return (
    <Space>
      <Tag color={color} key="tag">
        {name}
      </Tag>
    </Space>
  )
}

export default TagComp
