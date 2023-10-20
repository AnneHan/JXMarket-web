import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig } from '@wangeditor/editor'

import '@wangeditor/editor/dist/css/style.css' // 引入 css

type valueType = string | null | undefined
interface IEditorProps {
  value?: valueType
  onChange?: (value: valueType) => void
}

/**
 * 可以配合 form 的editor 组件
 * @param props
 * @returns
 */
const MyEditor:React.FC<IEditorProps> = (props) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null) // 存储 editor 实例
  const [html, setHtml] = useState('') // 编辑器内容

  useEffect(() => {
    props.value && setHtml(props.value)
  }, [])

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    autoFocus: false, // 不自动聚焦
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  const contentChangeHandle = (editor: any) => {
    const node = editor.getHtml()
    setHtml(editor.getHtml())
    // 内容为空时 gethtml得到的内容为 '<p><br></p>'
    props?.onChange?.(node === '<p><br></p>' ? '' : node)
  }

  return (
    <>
      <div className="editor-wrap">
        <Toolbar editor={editor} mode="default" style={{ borderBottom: '1px solid #d9d9d9' }} />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={contentChangeHandle}
          mode="default"
          style={{ height: '240px', overflowY: 'hidden' }}
        />
      </div>
    </>
  )
}

export default MyEditor
