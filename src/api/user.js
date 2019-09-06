/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-06 20:58:04
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
