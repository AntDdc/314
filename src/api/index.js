// 统一请求路径前缀在utils/axios.js中修改
import request from '@/utils/axios'

// 发送登录短信验证码
export function sendLoginSms (mobile) {
  return request.get(`/common/captcha/sendRegistSms/${mobile}`)
}

// 注册
export function reg (params) {
  return request.post('/common/user/regist', params, { isBase: false })
}

// 忘记密码
export function forgetPWD (params) {
  return request.post('/common/user/resetByMobile', params, { isBase: false })
}

// 账号登录
export function loginA (params) {
  return request.post('/login', params, { isBase: false })
}

// 手机号登录
export function login (params) {
  return request.post('/common/user/smsLogin', params, { isBase: false })
}

// 获取参赛组别
export function getGroup (params) {
  return request.get(`/match/${params}/group`, { isBase: false })
}

// 报名
export function postApply (params) {
  return request.post('/contestants/apply', params, { isBase: false, qs: false })
}

// 获取年级下拉框
export function getGrade (params) {
  return request.get('/dictData/getByType/grade', params)
}

// 获取用户参赛情况
export function getInfo (params) {
  return request.get(`/contestants/${params}/info`, { isBase: false })
}

// 提交作品
export function submitOp (params) {
  return request.post('/contestants/submitOpus', params, { isBase: false, qs: false })
}

// 获取作品工具
export function getTools (params) {
  return request.get('/dictData/getByType/tools', params)
}

// 获取参赛记录列表
export function getCards (params) {
  return request.get('/contestants/applyRecord', { isBase: false })
}

// 获取参赛记录详情
export function getDetail (params) {
  return request.get(`/contestants/applyRecord/${params}`, { isBase: false })
}

// 获取评审赛事、赛项
export function getMatchItem (params) {
  return request.get('/judge/info', { isBase: false })
}
// 获取评审card
export function getAssessCard (params) {
  return request.get(`/judge/${params}/cards`, { isBase: false })
}
// 获取获取评审记录详情
export function getRecordDetail (params) {
  return request.get(`/judge/cards/${params}`, { isBase: false })
}
// 获取评审规则详情
export function getRuleTable (params) {
  return request.get(`/judge/${params}/getRuleTable`, { isBase: false })
}
//  保存评分
export function keepScore (params) {
  return request.post(`/judge/saveScore`, params, { isBase: false, qs: false })
}
//  淘汰
export function pass (params) {
  return request.get(`/judge/weedOut/${params}`, { isBase: false })
}

// 修改密码
export function resetPassword (params) {
  return request.post(`/v1/user/resetPassword`, params, { isBase: false, qs: false})
}
