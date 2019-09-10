/*
 * @Description: 评论api
 * @Author: your name
 * @Date: 2019-09-10 14:41:17
 * @LastEditTime: 2019-09-10 16:05:49
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'
/**
 * @description:获取评论
 * @param {type}
 * @return:
 */
export const getComments = ({
  isArticle,
  source,
  offset,
  limit
}) => {
  return request.get('/app/v1_0/comments', {
    // a, 对文章的评论, c 对评论的评论
    params: {
      type: isArticle ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}

/**
 * @description:发布评论
 * @param {type}
 * @return:
 */
export const sendComment = ({ target,
  content,
  artId }) => {
  return request.post('/app/v1_0/comments', {
    target,
    content,
    art_id: artId
  })
}
