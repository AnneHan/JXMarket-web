/* 系统类 */
export const SYSTEM = {
  LANGUAGE: ['zh', 'en'],
  DEFAULT_LANGUAGE: 'zh',
  SUCCESS: 't',
  SUCCESS_F: 'f',
  INTERCEPTOR_TIMEOUT: 3000,
  ERROR_MESSAGE: '服务器异常,请稍候再试!',
  TOKEN_EXPIRED_ERROR: '登录超时,请重新登录!',
  LOGOUT_ERROR_MESSAGE: '登出异常',
  LOADING: '数据加载中, 请稍候',
  AES_KEY: '',
  AES_IV: '',
}

/* 常量 */
export const CONSTANT = {
  SUCCESS: 'SUCCESS',
  REQUEST_TIMEOUT: 30000,
  ERROR_MESSAGE: '服务器开小差了,请待会再试',
  TOKEN_EXPIRED_ERROR: '登录超时,请重新登录',
  TIMEOUT_MESSAGE: '服务器连接超时,请待会再试',
  LOADING: '数据加载中...',
  THEME: {
  }, // 主题色
  REQUEST: {
    DEFAULT_URL_FORMAT: 'JSON',
    DEFAULT_CONTENT_TYPE: 'application/json;charset=UTF-8',
    DEFAULT_FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
    DEFAULT_MS_EXCEL: 'application/vnd.ms-excel',
    X_REQUESTED_WITH: 'x-requested-with',
    DEFAULT_X_REQUESTED_WITH: 'XMLHttpRequest',
    CONTENT_TYPE_NAME: 'Content-Type',
  },
  CODE: {
    SUCCESS: 200,
    SUCCESS_RES: 't',
    TOKEN_ERROR_CODE: '203',
    TOKEN_EXPIRED_CODE: ['0002', '-5000', '-5001', '-5002', '203', '1013'],
  },
  LOADING_TIME: 3000,
  TOKEN_NAME: 'Token',
  SIGNATURE_KEY: '',
  EXCEL_SUFFIX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

/* storage 缓存key */
export const KEY = {
  FLAG: 'wechat', // 多渠道登录 区分key
  LANGUAGE: 'ZNJSIAOANNPLATLANGUAGE', // 语言
  THEME: 'KUHIUSJJSNNSHSSNSJHSJTHEME', // 主题
  NAVCONFIG: 'NBHJJNNNNAVCONFIG',
  TOKEN: 'IJHNISJSOKSTOKEN', //  token
  SUBAPP_TOKEN: 'UVIGBOUBNBBSUBAPPTOKEN', // 子应用token
  SERVERTYPE: 'JBIUHIUHNNBFFHSERVERTYPE', // 缓存当前应用
  SWITCHLOGIN: 'DASDHSASWITCHLOGIN', // 缓存当前登录页
  OPENID: 'IUHIUHIUHJIUJIUOPENID', // openid
  ACCOUNT: 'DSFDSDFSGACCOUNT', // 用户名密码 记住密码
  USERID: 'ASDGAHSDJFKZUSERID', // userid
  REMEMBER: 'IUKHSIHUBSHREMEMBER', // 记住密码
  USERINFO: 'SADAKJSDHAJKSUSERINFO', // 缓存用户信息
  MENU: 'SJAHDSJKHFKSJDMENU', // 缓存菜单
  USERLOGOFFDETAIL: 'SFSDFSDAAFUSERLOGOFFEMPLOYEEID', // 用户注销操作日志
}
