/*
 * @Description: 请求首页列表content
 * @Author: your name
 * @Date: 2019-09-05 14:25:17
 * @LastEditTime: 2019-09-08 22:38:05
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'
export const getArticles = ({
  // 频道的id
  channelId,
  // 时间戳
  timestamp,
  // 是否包含置顶1，0不包含
  withTop
}) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
/**
 * @description:不感兴趣
 * @param {type}
 * @return:
 */
export const dislikeArticle = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
    // 文章的id
    target: id
  })
}
/**
 * @description:举报文章
 * @param {type}
 * @return:
 */
export const reportArticle = ({
  target,
  type,
  remark
}) => {
  return request.post('/app/v1_0/article/reports', {
    target,
    type,
    remark
  })
}
/**
 * @description: 获取用户搜索历史
 * @param {type}
 * @return:
 */
export const getUserHistory = () => {
  return request.get('/app/v1_0/search/histories')
}
