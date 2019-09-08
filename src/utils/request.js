/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-08 22:36:19
 * @LastEditors: Please set LastEditors
 */

import Axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'
/**
 *  创建一个axios 实例,封装了baseUrl
 */
const instance = Axios.create({
  timeout: 5000,
  baseURL: 'http://ttapi.research.itcast.cn'
})
/**
 * 获取服务器返回的数据,并在处理数据之前调用
 */
instance.defaults.transformResponse = [function (data) {
  try {
    return JSONbig.parse(data)
  } catch (error) {
    console.log(error)
  }
}]
/**
 * 请求拦截器, 用来设置token等
 */
instance.interceptors.request.use(function (config) {
  if (store.state.user) {
    // 如果请求 有登录状态请求时, 自动携带token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (err) {
  return Promise.reject(err)
})
/**
 * 响应拦截器
 * response.data.data || response.data  返回的数据时response.data.data 时, 后面的response.data就不会执行
 */
instance.interceptors.response.use(function (response) {
  // console.log(response)
  return response.data.data || response.data
}, function (err) {
  return Promise.reject(err)
})
export default instance
