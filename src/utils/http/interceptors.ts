// 拦截器封装
import Utils from '../index'
import { CONSTANT, KEY } from '../constant'
import axios from './index'
import { AxiosRequestConfig, AxiosError } from 'axios'
import hmacSha256 from 'crypto-js/hmac-sha256'
import CommonStore from '@/store/common.store'

enum EMethodsType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IRequestProps extends AxiosRequestConfig {
  url: string
  data?: any
  checkResponse?: boolean // 是否校验 response 数据格式
}

/**
 * request 处理
 */
class Request {
  config: any = null
  urlQuery: Object | null = null
  /**
   * 请求处理
   * @param config 请求config
   */
  requestConfig = (config: AxiosRequestConfig) => {
    // CommonStore.showLoading()
    this.config = config
    this.urlQuery = Utils.objectValueToString(
      Utils.parseQuery(this.config.url) || this.config.params || null
    )

    // ASCII码排序
    this.sortASCII()
    // header 封装
    config.headers = this.setHeaders(config)

    return config
  }

  // 设置请求头
  setHeaders = (config: any = {}) => {
    if (!config) return {} // 校验config
    if (!config.url) return {} // 校验url

    let type = config.type || CONSTANT.REQUEST.DEFAULT_URL_FORMAT
    if (type.toUpperCase() === CONSTANT.REQUEST.DEFAULT_URL_FORMAT) {
      type = CONSTANT.REQUEST.DEFAULT_CONTENT_TYPE
    } else if (type.toUpperCase() === 'FORM') {
      type = undefined
    } else {
      type = CONSTANT.REQUEST.DEFAULT_FORM_URLENCODED
    }

    let headers = {}
    // @ts-ignore
    headers[CONSTANT.REQUEST.X_REQUESTED_WITH] = CONSTANT.REQUEST.DEFAULT_X_REQUESTED_WITH
    // @ts-ignore
    headers[CONSTANT.TOKEN_NAME] = Utils.getLocal(KEY.TOKEN) || ''

    if (type) {
      // @ts-ignore
      headers[CONSTANT.REQUEST.CONTENT_TYPE_NAME] = type
    }

    // 生成签名
    this.signature(headers)

    return headers
  }

  /**
   * 请求失败处理
   * @param err
   */
  requestError = (error: AxiosError) => {
    // CommonStore.clearLoading()
    return Promise.reject(error)
  }

  /**
   * 响应处理
   * @param response 返回体
   */
  responseConfig = (response: any) => {
    if (this.config.checkResponse === false) return response

    if (response.status === 200) {
      const data = response.data

      if (data.success !== CONSTANT.CODE.SUCCESS_RES) {
        // 下载跳过拦截
        if (data.type !== CONSTANT.REQUEST.DEFAULT_MS_EXCEL)
          CommonStore.globalWarning({ content: data.msg || CONSTANT.ERROR_MESSAGE })
      }

      if (CONSTANT.CODE.TOKEN_EXPIRED_CODE.includes(data.code)) {
        // 拦截 重新登录
        Utils.removePlatToken()
        Utils.logoutTologinPage()
      }
      // 成功
      return data
    } else {
      CommonStore.globalError({ content: CONSTANT.ERROR_MESSAGE })
    }
  }

  /**
   * 响应失败处理
   * @param err
   */
  reponseError = (error: any) => {
    // CommonStore.clearLoading()
    // CommonStore.showToast({ content: CONSTANT.ERROR_MESSAGE })
    return Promise.reject(error)
  }

  send = (config: any) => {
    return new Promise((resolve: any, reject: any) => {
      axios(config)
        .then(<T>(res: T): any => resolve(res))
        .catch(<T>(err: T): any => reject(err))
    })
  }

  /**
   * get请求
   * @param config
   */
  get = (config: IRequestProps) => {
    return this.send(Object.assign({}, config, { method: EMethodsType.GET }))
  }

  /**
   * post请求
   * @param config
   */
  post = (config: IRequestProps) => {
    return this.send(Object.assign({}, config, { method: EMethodsType.POST }))
  }

  /**
   * put请求
   * @param config
   */
  put = (config: IRequestProps) => {
    return this.send(Object.assign({}, config, { method: EMethodsType.PUT }))
  }

  /**
   * delete请求
   * @param config
   */
  delete = (config: IRequestProps) => {
    return this.send(Object.assign({}, config, { method: EMethodsType.DELETE }))
  }

  /**
   * 接口签名
   * @param headers
   */
  signature = (headers: any) => {
    if (!headers) return

    // 核心upload的加密key 和 欣服务 不一样
    const params = this.signatureParams(headers)

    headers['signature'] = hmacSha256(params, CONSTANT.SIGNATURE_KEY)
  }

  /**
   *  签名参数拼接
   * @param headers
   */
  signatureParams = (headers: any) => {
    const method = this.config.method
    const params = this.config.data || {}

    let str = ''

    const uuid = Utils.generateUUID().toString().replace('-', '')

    const timestamp = new Date().getTime() // 时间戳

    headers['timestamp'] = timestamp
    headers['nonce'] = uuid

    // 参数拼接规则body + query , 没值时补 ’{}‘
    if (method === 'get' || method === 'GET') {
      str = `{}${JSON.stringify(this.urlQuery || {})}`
    }

    if (method === 'post' || method === 'POST') {
      // 以防不规范请求，post url也拼接参数情况
      const otherQuery = this.urlQuery ? JSON.stringify(this.urlQuery) : '{}'
      str = JSON.stringify(params) + otherQuery
    }

    return `${timestamp}&${uuid}&${str}`
  }

  /**
   * ASCII码排序
   */
  sortASCII = () => {
    if (this.urlQuery && Object.keys(this.urlQuery).length > 1) {
      this.urlQuery = Utils.sortASCII(this.urlQuery)
      this.config.params = this.urlQuery
    }

    if (this.config.method === 'post' || this.config.method === 'POST') {
      const params = this.config.data
      if (Object.keys(params).length) {
        this.config.data = Utils.nullToStr(Utils.sortASCII(params))
      }
    }
  }
}

export default new Request()
