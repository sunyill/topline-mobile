/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-10 14:15:20
 * @LastEditors: Please set LastEditors
 */

import Axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'
import router from '@/router'

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
}, async function (err) {
  if (err.response.status === 401) {
    // 使用refresh-token 交换新的token
    const refreshToken = store.state.user.refresh_token
    try {
      const response = await Axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      // 新两个小时获取token
      const token = response.data.data.token
      // 存储到仓库中
      store.commit('setUser', {
        token: token,
        refresh_token: refreshToken
      })
      // 重新发送上一次401请求
      return instance(err.config)
    } catch (error) {
      console.log(error)
      // 跳转到首页
      // 如果token过期,则跳转到登录页,并且登录成功后 跳转到刚才浏览的页面
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
  }
  return Promise.reject(err)
})
export default instance
