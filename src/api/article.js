/*
 * @Description: 请求首页列表content
 * @Author: your name
 * @Date: 2019-09-05 14:25:17
 * @LastEditTime: 2019-09-05 18:59:31
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
