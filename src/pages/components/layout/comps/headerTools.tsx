import React from 'react'
import { Avatar, Dropdown } from 'antd'
import { useStore, observer } from '@/store/index'
import { UserOutlined } from '@ant-design/icons'

import Icon from '@/assets/svg'
import UserTool from './userTool'
// import GlobalizationTool from './globalizationTool'

/**
 * header 右侧功能区
 */
const HeaderTools: React.FC = (): React.ReactElement => {
  const { layoutStore } = useStore()
  const { info, fullScreen, requestFullScreen, exitFullscreen, showTool } = layoutStore

  return (
    <div className="layout-header-right flex-align-center ">
      {/* <Dropdown
        className="layout-header-globalization flex-align-center"
        overlay={<GlobalizationTool />}
        placement="bottomLeft"
      >
        <span onMouseEnter={() => showTool(false)}>
          <Icon name="globalization" />
        </span>
      </Dropdown> */}

      {/* <span className="layout-header-notice flex-align-center">
        <Icon name="notice" />
        <span className="layout-header-notice"></span>
      </span> */}

      <span className="layout-header-trigger layout-header-trigger-min flex-align-center">
        {fullScreen ? (
          <span onClick={exitFullscreen}>
            <Icon name="full2" />
          </span>
        ) : (
          <span onClick={requestFullScreen}>
            <Icon name="full" />
          </span>
        )}
      </span>

      <Dropdown
        className="layout-header-user flex-align-center"
        overlay={<UserTool />}
        placement="bottomLeft"
      >
        <span onMouseEnter={() => showTool(false)}>
          <Avatar className="m-r-10" src={info?.avatar} size={25} icon={<UserOutlined />} />
          <span>{info?.username}</span>
        </span>
      </Dropdown>

      <span
        className="layout-header-set layout-header-trigger-set flex-align-center"
        onClick={() => showTool()}
      >
        <Icon name="more" />
      </span>
    </div>
  )
}

export default observer(HeaderTools)
