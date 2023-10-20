import { Base64 } from 'js-base64'
import { SYSTEM, KEY } from './constant'
import CommonStore from '@/store/common.store'
import ROUTE from '@/router/constant'
import CryptoJS from 'crypto-js'
import { debounce } from 'lodash'

class Utils {
  /**
   * 判断是否是微信浏览器
   */
  isWeixinClient = () => {
    let ua = navigator.userAgent.toLowerCase()
    const reg = /MicroMessenger/i
    return reg.test(ua)
  }

  /**
   * Base64加密
   */
  encrypt = (str: any): string => {
    if (!str) return ''
    return Base64.encode(str)
  }

  /**
   * Base64解密
   */
  decrypt = (str: any): string => {
    if (!str) return ''
    return Base64.decode(str)
  }

  /**
   * 从localStorage中设置值
   */
  setLocal = (name: string, item: any) => {
    if (!item) return
    localStorage.setItem(`${name}_${KEY.FLAG}`, this.encrypt(JSON.stringify(item)))
  }

  /**
   * 从localStorage中获取值
   */
  getLocal = (name: string) => {
    const item = localStorage.getItem(`${name}_${KEY.FLAG}`)

    if (!item) return null
    return JSON.parse(this.decrypt(item))
  }

  /**
   * 从localStorage中移除token
   */
  removeLocal = (name: string) => {
    localStorage.removeItem(`${name}_${KEY.FLAG}`)
  }

  /**
   * 从sessionStorage中设置值
   */
  setSession = (name: string, item: any) => {
    if (!item) return
    sessionStorage.setItem(`${name}_${KEY.FLAG}`, this.encrypt(JSON.stringify(item)))
  }

  /**
   * 从sessionStorage中获取值
   */
  getSession = (name: string) => {
    const item = window.sessionStorage.getItem(`${name}_${KEY.FLAG}`)
    if (!item) return null
    return JSON.parse(this.decrypt(item))
  }

  /**
   * 从sessionStorage中移除
   */
  removeSession = (name: string) => {
    sessionStorage.removeItem(`${name}_${KEY.FLAG}`)
  }

  /**
   * 解析get请求url参数
   * @param {*} str 请求地址 /xxxapi?id=007
   * 如果url 存在？拼接参数，返回参数对象，不存在返回null
   */
  parseQuery = (str: string) => {
    var qso: any = {}
    var qs: any = str || document.location.search
    // eslint-disable-next-line
    if (qs == '') {
      return qso
    }
    if (qs.indexOf('?') > -1) {
      qs = qs.split('?')[1]
    } else {
      return null
    }
    // eslint-disable-next-line
    qs = qs.replace(/;/g, '&')
    // eslint-disable-next-line
    while (qs.indexOf('&&') != -1) {
      // eslint-disable-next-line
      qs = qs.replace(/&&/g, '&')
    }
    // eslint-disable-next-line
    qs = qs.replace(/([\&]+$)/, '')
    // Break the querystring into parts
    qs = qs.split('&')
    // Build the querystring object
    for (var i = 0; i < qs.length; i++) {
      var qi = qs[i].split('=')
      qi = qi.map(function (n: any) {
        return decodeURIComponent(n)
      })
      // eslint-disable-next-line
      if (qso[qi[0]] != undefined) {
        // eslint-disable-next-line
        if (typeof qso[qi[0]] == 'string') {
          var temp = qso[qi[0]]
          // eslint-disable-next-line
          if (qi[1] == '') {
            qi[1] = null
          }
          qso[qi[0]] = []
          qso[qi[0]].push(temp)
          qso[qi[0]].push(qi[1])
          // eslint-disable-next-line
        } else if (typeof qso[qi[0]] == 'object') {
          // eslint-disable-next-line
          if (qi[1] == '') {
            qi[1] = null
          }
          qso[qi[0]].push(qi[1])
        }
      } else {
        // eslint-disable-next-line
        if (qi[1] == '') {
          qi[1] = null
        }
        qso[qi[0]] = qi[1]
      }
    }
    return qso
  }

  /**
   * 将对象的value 转字符串类型
   * @param obj
   */
  objectValueToString = (obj: Object | null) => {
    if (!obj) return null
    const keys = Object.keys(obj)

    keys.length &&
      keys?.forEach((item: string) => {
        // @ts-ignore
        obj[item] = obj[item] + ''
      })
    return obj
  }

  /**
   * aes加密
   * @param params
   * @param needJSON
   */
  encryptAES = (params: any, needJSON: boolean = true) => {
    const data = needJSON ? JSON.stringify(params) : params
    return CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(data),
      CryptoJS.enc.Utf8.parse(SYSTEM.AES_KEY),
      {
        iv: CryptoJS.enc.Utf8.parse(SYSTEM.AES_IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString()
  }

  /**
   * aes解密
   * @param params
   */
  decryptAES = (params: any) => {
    let decrypted = CryptoJS.AES.decrypt(params, CryptoJS.enc.Utf8.parse(SYSTEM.AES_KEY), {
      iv: CryptoJS.enc.Utf8.parse(SYSTEM.AES_IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  }

  /**
   * 登出 清除token
   */
  removePlatToken = () => {
    this.removeLocal(KEY.TOKEN)
    this.removeLocal(KEY.USERID)
  }

  /**
   * 关闭浏览器
   */
  closeBrowser = () => {
    //@ts-ignore
    if (window.WeixinJSBridge) {
      //@ts-ignore
      WeixinJSBridge.call('closeWindow')
      return
    }

    if (
      navigator.userAgent.indexOf('Firefox') !== -1 ||
      navigator.userAgent.indexOf('Chrome') !== -1
    ) {
      window.location.href = 'about:blank'
      window.close()
      return
    }

    window.opener = null
    window.open('', '_self')
    window.close()
  }

  /**
   * 清除 history
   * @param history
   */
  clearHistoryRouter = (history: any) => {
    if (!history) return
    let backlen = history.length - 1
    history.go(-backlen) // Return at the beginning
  }

  /**
   * ios 软键盘挤压页面 兼容
   */
  inputBlur = () => {
    // iphone 部分手机 部分系统版本 软件盘弹起挤压页面，页面底部空白
    window.scrollTo(0, 0) //页面滚动到顶部
  }

  /**
   * 生成uuid
   */
  generateUUID = function () {
    let random = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    return (
      random() +
      random() +
      '-' +
      random() +
      '-' +
      random() +
      '-' +
      random() +
      '-' +
      random() +
      random() +
      random()
    )
  }

  /**
   *  对象进行 ASCII 排序
   * @param obj
   */
  sortASCII = function (obj: any) {
    var arr = []
    var num = 0
    for (let i in obj) {
      arr[num] = i
      num++
    }
    var sortArr = arr.sort()
    var sortObj: any = {}
    for (let i in sortArr) {
      sortObj[sortArr[i]] = obj[sortArr[i]]
    }
    return sortObj
  }

  /**
   * 对象转get传参字符串
   * @param {*} obj
   * eg: {a:b,c:d} => ?a=b&c=d
   */
  objToQueryStr = function (obj: any) {
    if (!obj || typeof obj !== 'object') return ''
    let str = '?'
    const keys = Object.keys(obj)
    const len = keys.length

    keys.forEach((key, i) => {
      str += i === len - 1 ? `${key}=${obj[key]}` : `${key}=${obj[key]}&`
    })
    return str
  }

  IsPC = () => {
    var userAgentInfo = navigator.userAgent
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    var flag = true
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    return flag
  }

  logoutTologinPage = () => {
    CommonStore.replace(ROUTE.LOGIN)
  }

  /**
   * 判断元素是否在可视区域
   * @param el 元素
   * @returns
   */
  isElementInViewport = (el: any | null) => {
    if (!el) return
    //获取元素是否在可视区域
    var rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  /**
   * null转换空字符串
   * @param data
   * @returns
   */
  nullToStr = (data: { [key: string]: any }) => {
    for (var x in data) {
      const item = data[x]

      if (item === null) {
        // 如果是null 把直接内容转为 ‘’
        data[x] = ''
        continue
      }
      if (Array.isArray(item) && item.length) {
        // 是数组遍历数组 递归继续处理
        data[x] = item.map((z: any) => {
          if (typeof z === 'object' && z !== null) return this.nullToStr(z)
          return z === null ? '' : z
        })
        continue
      }
      if (typeof item === 'object') {
        // 是json 递归继续处理
        data[x] = this.nullToStr(item)
      }
    }
    return data
  }
}

export { KEY, CONSTANT, SYSTEM } from './constant'
export default new Utils()
