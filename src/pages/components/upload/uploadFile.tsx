import React, { useEffect, useState } from 'react'
import { Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type {
  RcFile,
  UploadFile,
  UploadProps,
  ShowUploadListInterface,
} from 'antd/es/upload/interface'
import './index.module.scss'
import { Button } from 'antd'

type ValueType = UploadFile[] | null | undefined

interface IUploadProps {
  api: (data: any) => Promise<any>
  value?: ValueType
  onChange?: (value: ValueType) => void
  preview?: boolean // 是否支持预览
  length?: number // 当上传照片数到达限制后，上传按钮消失。
  maxCount?: number // 通过 maxCount 限制上传数量。当为 1 时，始终用最新上传的代替当前。
  multiple?: boolean // 是否支持多选
  data?: Record<string, any> // 上传所需额外参数或返回上传额外参数的方法
  beforeUpload?: UploadProps['beforeUpload']
  showUploadList?: ShowUploadListInterface // 控制图片hover时，各种icon的显示
}

/**
 * 上传文件组件，可以配合form表单使用
 * 注： 目前仅支持单个上传，多张上传接口和前端目前都不支持
 * @returns
 */
const UploadFileComp: React.FC<IUploadProps> = props => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (!props.value || !props.value[0]?.url) return
    // 1. 接受 form的默认值
    setFileList(props.value)
  }, [props.value])

  const handleUpload = ({ fileList: newFileList }) => {
    if (!newFileList.length) {
      setFileList(newFileList)
      return false
    }
    let name = ''

    const formData = new FormData()

    fileList.forEach(file => {
      formData.append('files', file as RcFile)
      name = file.name
    })

    props.api(formData).then((res: any) => {
      if (res.success === 't' && res.result) {
        // 2.数据返回给上级form
        props?.onChange && props?.onChange({ ...res.result, name })
      }
    })
  }

  const propsUplad: UploadProps = {
    beforeUpload: file => {
      setFileList([...fileList, file])
      return false
    },
    fileList,
  }

  // 删除
  const handleRemove: UploadProps['onRemove'] = (param): void => {
    props?.onChange && props?.onChange([])
  }

  return (
    <>
      <Upload
        className="upload-file"
        {...propsUplad}
        maxCount={props?.maxCount}
        onRemove={handleRemove}
        onChange={handleUpload}
      >
        {fileList.length < (props?.length || 20) && (
          <Button>
            <UploadOutlined />
          </Button>
        )}
      </Upload>
    </>
  )
}

UploadFileComp.defaultProps = {
  multiple: false,
  length: 10,
  maxCount: 10,
  preview: true, // 默认支持预览
  showUploadList: {},
}

export default UploadFileComp
