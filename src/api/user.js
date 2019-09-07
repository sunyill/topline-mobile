/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-07 16:05:10
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
