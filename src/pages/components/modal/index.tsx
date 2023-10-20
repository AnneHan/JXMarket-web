import React, { useState, useRef, useEffect } from 'react'
import { Button, Modal } from 'antd'
import type { ModalProps } from 'antd/es'
import type { DraggableData, DraggableEvent } from 'react-draggable'
import Draggable from 'react-draggable'
import Title from './title'

interface IFooterProps {
  readOnly?: boolean
  customFooter?: boolean
}

/**
 * modal 封装
 * 1. 支持拖动
 * 2. 支持放大到全屏
 * 4. modal确定按钮 提交form表单
 */
const ModalComps: React.FC<ModalProps & IFooterProps> = React.memo((props): React.ReactElement => {
  const [form, setForm] = useState(null) // 子级的form
  const [disabled, setDisabled] = useState(false) // 是否开始拖拽
  const [full, setFull] = useState(false) //  是否是全屏
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const draggleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 弹窗关闭的时候，full 重置
    if (props?.visible === false) setFull(false)
  }, [props.visible])

  // 给子组件注入事件 onModalForm
  // 子组件通过onModalForm将form传给modal, modal接管form表单
  const childrenRender = () => {
    const prop = {
      onModalForm: getChildrenForm,
    }
    return React.Children.map(props?.children, (child: any) => React.cloneElement(child, prop))
  }

  // 获取到子组件form 实例
  const getChildrenForm = (form: any) => setForm(form)

  // modal点击提交的时候 将子form的数据传给 modal 的确认事件
  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    if (form) {
      // @ts-ignore
      form
        // @ts-ignore
        ?.validateFields()
        .then((values: IObjectProps) => {
          return values
        })
        .catch(() => {
          return false
        })
        .then((res: any) => {
          // 校验不通过，不触发 modal 确认事件
          if (res === false) return
          props?.onOk?.(res || '')
        })
      return
    }
    props?.onOk?.(e)
  }

  // 拖动位置处理
  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()
    if (!targetRect) return

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    })
  }

  // modal 可拖动处理
  const modalRender = (modal: React.ReactNode) => {
    // modal 全局弹窗 时不允许拖动
    if (full) return modal

    return (
      <>
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      </>
    )
  }

  return (
    <Modal
      width={900}
      {...props}
      title={
        <Title
          title={props.title}
          disabled={disabled}
          setDisabled={setDisabled}
          full={full}
          setFull={setFull}
        />
      }
      className={`hyl-modal ${full ? 'full' : ''}`}
      centered={!full}
      modalRender={modalRender}
      footer={[
        props.readOnly ? (
          props.customFooter ? (
            props.footer
          ) : (
            <Button key="cancel" onClick={props.onCancel}>
              关闭
            </Button>
          )
        ) : (
          <div key="btn">
            <Button key="submit" type="primary" onClick={onSubmit}>
              确认
            </Button>
            <Button key="back" onClick={props.onCancel}>
              取消
            </Button>
          </div>
        ),
      ]}
      getContainer={'#root'}
    >
      {childrenRender()}
    </Modal>
  )
})

export default ModalComps
