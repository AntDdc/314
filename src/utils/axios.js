import axios from 'axios'
import tool from '@/utils/tool'
import router from '@/router'
import { Loading } from 'element-ui'
import qs from 'qs'
// 统一请求路径前缀
let base = '/xboot'
let base2 = '/api'
var isLoading, isSuccessTip, isErrorTip, loading
const request = axios.create({
  baseURL: base,
  timeout: 2000,
  headers: {
    // 'Content-Type': 'application/json;chartset=uft-8' // json
    'Content-Type': 'application/x-www-form-urlencoded' // form
  },
  withCredentials: false,
  qs: true,
  /* 自定义 */
  isLoading: true,
  isSuccessTip: false,
  isErrorTip: true,
  isBase: true
})
/* request拦截器 */
request.interceptors.request.use(
  config => {
    !config.isBase && (config.baseURL = base2)
    config.isBase && (config.baseURL = base)
    isLoading = config.isLoading
    isSuccessTip = config.isSuccessTip
    isErrorTip = config.isErrorTip
    config.isLoading && (loading = Loading.service({ text: '正在加载中', background: 'rgba(0, 0, 0, 0.3)' }))
    config.qs && (config.data = qs.stringify(config.data, { indices: false }))
    !config.qs && (config.headers = {
      'Content-Type': 'application/json;chartset=uft-8'
    })
    tool.sessionGet('accessToken') && (config.headers['accessToken'] = tool.sessionGet('accessToken'))
    !tool.sessionGet('accessToken') && (config.headers['accessToken'] = '-1')
    return config
  },
  err => {
    loading && loading.close()
    isErrorTip && tool.messageError('网络状态差')
    return Promise.reject(err)
  }
)
// 响应拦截器
request.interceptors.response.use(
  res => {
    isLoading && loading.close()
    const { data } = res
    // tool.checkStatus(data.code)
    if (data.code === 401) {
      tool.messageError('登录已失效，请重新登录')
      tool.sessionRem('userType')
      tool.sessionRem('accessToken')
      router.push({
        name: 'home'
      })
    }
    return data
    // tool.checkStatus(data.code, data.message, isSuccessTip, isErrorTip)
    // if (data.code === 200) return data
    // else return Promise.reject(res)
  },
  err => {
    isLoading && loading.close()
    isErrorTip && tool.messageError('网络状态差')
    return Promise.reject(err)
  }
)

export default request
