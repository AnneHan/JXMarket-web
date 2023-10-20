import React, { useEffect, useState } from 'react'
import { Upload, Modal } from 'antd'
import ImgCrop from 'antd-img-crop'
import { PlusOutlined } from '@ant-design/icons'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import './index.module.scss'

type ValueType = UploadFile[] | null | undefined

interface ImgCropProps {
  aspect?: number
  shape?: 'rect' | 'round'
  grid?: boolean
  quality?: number
  fillColor?: string

  zoom?: boolean
  rotate?: boolean
  minZoom?: number
  maxZoom?: number

  modalTitle?: string
  modalWidth?: number | string
  modalOk?: string
  modalCancel?: string
  modalMaskTransitionName?: string
  modalTransitionName?: string
  onModalOk?: (file: void | boolean | string | Blob | File) => void
  onModalCancel?: () => void

  beforeCrop?: (file: File, fileList: File[]) => boolean | Promise<boolean>
  onUploadFail?: (err: Error) => void
}

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
  cropProps?: ImgCropProps & { children?: JSX.Element }
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

/**
 * 上传图片组件(可以裁切)，可以配合form表单使用
 * 注： 目前仅支持单张上传，多张上传接口和前端目前都不支持
 * @returns
 */
const UploadCrop: React.FC<IUploadProps> = (props): React.ReactElement => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (!props.value || !props.value[0]?.url) return
    // 1. 接受 form的默认值
    setFileList(props.value)
  }, [props.value])

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  // 预览
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const handleCancel = () => setPreviewVisible(false)

  // 上传之前处理，return false 不走upload组件上传
  const handleBeforeUpload: UploadProps['beforeUpload'] = (file: RcFile, fileList: RcFile[]) => {
    const formdata = new FormData()
    formdata.append('files', file)

    // 将需要多传的参数 注入formdata
    if (props.data && Object.keys(props.data).length) {
      for (let key in props.data) {
        formdata.append(key, props.data[key])
      }
    }

    // 图片上传
    props.api(formdata).then((res: any) => {
      console.log('res', res)
      if (res.success === 't' && res.result) {
        // 2.数据返回给上级form
        props?.onChange && props?.onChange(res.result)
      }
    })

    return false
  }

  // 删除
  const handleRemove: UploadProps['onRemove'] = (param): void => {
    props?.onChange && props?.onChange([])
  }

  return (
    <>
      <ImgCrop {...props.cropProps}>
        <Upload
          listType="picture-card"
          multiple={props?.multiple}
          maxCount={props.maxCount}
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={handleRemove}
          beforeUpload={handleBeforeUpload}
          showUploadList={{ showPreviewIcon: props.preview }} //
        >
          {fileList.length < (props?.length || 20) && <PlusOutlined />}
        </Upload>
      </ImgCrop>

      {/* 图片预览 */}
      {props.preview ? (
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
          destroyOnClose
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      ) : (
        ''
      )}
    </>
  )
}

UploadCrop.defaultProps = {
  multiple: false,
  length: 10, // 默认图片列表可以展示图片的数量，当上传照片数到达限制后，上传按钮消失。
  maxCount: 10,
  preview: true, // 默认支持预览
  cropProps: {},
}

export default UploadCrop
