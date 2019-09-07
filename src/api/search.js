/*
 * @Description: 搜索API
 * @Author: your name
 * @Date: 2019-09-07 22:29:13
 * @LastEditTime: 2019-09-07 22:32:35
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'
/**
 * @description:获取联想建议   参数Q
 * @param {type}
 * @return:
 */
export const getSuggestion = (q) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}
