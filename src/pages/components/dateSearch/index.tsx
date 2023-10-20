import { DatePicker } from 'antd'
// import dayjs from 'dayjs'
// import { RangePickerProps } from 'antd/lib/date-picker'
const { RangePicker } = DatePicker

// 自定义时间选择器
const EnployeeSearch = (
  _: any,
  { type, defaultRender, formItemProps, fieldProps, distinguish, ...rest }: any,
  form: any
) => {
  // eslint-disable-next-line arrow-body-style
  // const disabledDate: RangePickerProps['disabledDate'] = current => {
  //   // Can not select days before today and today
  //   return current && current > dayjs().endOf('day')
  // }
  if (type === 'form') {
    return null
  }
  const status = form.getFieldValue('state')
  if (status !== 'open') {
    return (
      // value 和 onchange 会通过 form 自动注入。
      <RangePicker
        showTime={{ format: 'HH:mm:ss' }}
        {...formItemProps}
        {...fieldProps}
        placeholder={['开始时间', '结束时间']}
        // disabledDate={disabledDate}
      />
    )
  }
  return defaultRender(_)
}

export default EnployeeSearch
