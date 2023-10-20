
import zh from './zh'
import en from './en'

export interface IlocalesType {
  en: IObjectProps
  zh: IObjectProps
}

const locales: IlocalesType = { en, zh }

export default locales
