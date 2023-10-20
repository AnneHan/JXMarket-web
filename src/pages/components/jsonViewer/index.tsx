// https://github.com/mac-s-g/react-json-view/blob/master/demo/src/js/components/Demo.js
import React from 'react'
import ReactJson from 'react-json-view'

interface IJsonViewerProps {
  json: string
}

/**
 * json格式数据展示
 * @param param0
 * @returns
 */
const JsonViewer: React.FC<IJsonViewerProps> = ({ json }): React.ReactElement => {
  return json ? (
    <ReactJson
      src={JSON.parse(json)}
      onEdit={false}
      onDelete={false}
      onAdd={false}
      displayDataTypes={false}
    />
  ) : (
    <></>
  )
}

export default JsonViewer
