/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-12 13:58:33
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'

/**
 * 封装的是user请求的部分
 */
export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}

/**
 * @description:拉黑作者
 * @param {type}
 * @return:
 */
export const blacklists = (id) => {
  return request.post('/app/v1_0/user/blacklists', {
    target: id
  })
}
/**
 * @description:删除用户的指定频道
 * @param {type}
 * @return:
 */
export const deleteChannel = (id) => {
  return request.delete(`/app/v1_0/user/channels/${id}`)
}
/**
 * @description: 添加用户的指定频道
 * @param {type} id:频道id  sep:顺序序号
 * @return:
 */
export const addChannel = (id, sep) => {
  return request.post(' /app/v1_0/user/channels', {
    channels: [
      id,
      sep
    ]
  })
}

// 关注用户
export const followUser = (id) => {
  return request.post('/app/v1_0/user/followings', {
    // 关注用户的id
    target: id
  })
}

// 取消关注用户
export const unFollowUser = (id) => {
  return request.delete(`/app/v1_0/user/followings/${id}`)
}
/**
 * @description:获取当前用户信息
 * @param {type}
 * @return:
 */
export const getUserInfo = () => {
  return request.get('/app/v1_0/user')
}
