/*
 * @Description: 获取频道列表;在用户登录的情况下,获取用户列表; 没登录时,获取全部信息列表
 * @Author: wangzhan
 * @Date: 2019-09-05 13:30:21
 * @LastEditTime: 2019-09-10 10:09:29
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

// 删除用户的指定频道
export const deleteChannel = (id) => {
  return request.delete(`/app/v1_0/user/channels/${id}`)
}

// 添加用户的指定频道
// id 频道的id， seq是当前项的序号
export const addChannel = (id, seq) => {
  return request.patch('/app/v1_0/user/channels', {
    channels: [
      {
        id,
        seq
      }
    ]
  })
}
