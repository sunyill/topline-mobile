/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-12 16:28:53
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

// 获取当前登录的用户的资料
export const getUserProfile = () => {
  return request.get('/app/v1_0/user/profile')
}
// 用户上传头像接口
export const uploadPhoto = (key, file) => {
  const formData = new FormData()
  formData.append(key, file)
  return request.patch('/app/v1_0/user/photo', formData)
}
// 获取关注用户列表
export const getFollowings = ({
  page,
  perPage
}) => {
  return request.get('/app/v1_0/user/followings', {
    params: {
      page,
      per_page: perPage
    }
  })
}

// 获取粉丝用户列表
export const getFollowers = ({
  page,
  perPage
}) => {
  return request.get('/app/v1_0/user/followers', {
    params: {
      page,
      per_page: perPage
    }
  })
}
