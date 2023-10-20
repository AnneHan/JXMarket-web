import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import Request from './interceptors'

axios.defaults.timeout = 500000
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || '/platApi'

/**
 * 请求拦截
 */
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return Request.requestConfig(config)
  },
  (err: AxiosError) => {
    Request.requestError(err)
  }
)

/**
 * 响应拦截
 */
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return Request.responseConfig(response)
  },
  (err: AxiosError) => {
    Request.reponseError(err)
  }
)

export default axios
