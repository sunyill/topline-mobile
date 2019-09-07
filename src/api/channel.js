/*
 * @Description: 获取频道列表;在用户登录的情况下,获取用户列表; 没登录时,获取全部信息列表
 * @Author: wangzhan
 * @Date: 2019-09-05 13:30:21
 * @LastEditTime: 2019-09-07 13:32:06
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'
export const getDefaultOrUserList = () => {
  return request.get('/app/v1_0/user/channels')
}
/**
 * @description: 获取所有的频道列表
 * @param {type} get
 * @return:
 */
export const getAllChannels = () => {
  return request.get('/app/v1_0/channels')
}
