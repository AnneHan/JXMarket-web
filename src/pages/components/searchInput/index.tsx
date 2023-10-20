import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
const { Option } = Select

interface ISearchInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  style?: React.CSSProperties
  onSearch: (value: string, setData: any) => void // 用户输入，触发请求
}

/**
 * 支持输入+搜索的 select
 * 可配合form使用
 * @param props
 */
const SearchInput: React.FC<ISearchInputProps> =  props => {
  const [data, setData] = useState<any[]>([])
  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (props?.value && typeof props.value === 'object') {
      setData(props?.value || [])
    }
  }, [])


  const handleSearch = (newValue: string) => {
    if(newValue){
      setValue(newValue)
      props?.onSearch(newValue, setData)
      // @ts-ignore
      props?.onChange(newValue?.trim())
      return
    }
   setData([])
  }

  const handleChange = (newValue: string) => {
    setValue(newValue)

    // 值回传给父级
    // @ts-ignore
    props?.onChange(newValue?.trim())
  };

  const handleClear =()=>{
    setData([])
  }

  const options =
     typeof data === 'object' && data?.map(d => <Option key={d.value}>{d.text}</Option>)


  return (
    <Select
      allowClear
      showSearch
      value={value}
      showArrow={false}
      style={props.style}
      filterOption={false}
      onChange={handleChange}
      onSearch={handleSearch}
      onClear={handleClear}
      notFoundContent={null}
      defaultActiveFirstOption={false}
      placeholder={props.placeholder}
    >
      {options}
    </Select>
  )
}

export default React.memo(SearchInput)
