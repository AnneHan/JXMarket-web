import type { Form } from 'antd'
// 业务枚举
export enum EBusiness {
  client,
  category,
  underwriter,
  subUnderwriter,
}

// crud 枚举
export enum ECrudType {
  add = 'add',
  delete = 'delete',
  edit = 'edit',
  search = 'search',
}

// tag 枚举
export enum EStatus {
  // 正常/冻结
  status = [
    { key: true, name: '正常', color: 'green' },
    { key: false, name: '冻结', color: 'red' },
  ],
  // MGU/TPA
  entry = [
    { key: '01', name: 'MGU', color: 'geekblue' },
    { key: '02', name: 'TPA', color: 'volcano' },
  ],
  // 未读/已读
  isRead = [
    { key: '0', name: '未读', color: 'gold' },
    { key: '1', name: '已读', color: 'green' },
  ],
}

// 电子卡
export type CardTemplateType = {
  bgImagePath: string
  bottomLogo1: string
  bottomLogo2: string
  bottomLogo3: string
  bottomLogo4: string
  businessType: string
  cardTemplate: string
  clientId: string
  clientShortName: string
  id: string
  planType: string
  specialClass: string
  specialClassName: string
  topLogo1: string
  topLogo2: string
  topLogo3: string
  topLogo4: string
  uwId: string
  uwName: string
  templatePreview?: boolean
}

export interface IOnlineCardProps {
  cardData?: any
  cardTemplate: CardTemplateType
}

export interface IModalChildrenProps {
  onModalForm?: (form: Form) => any
}
