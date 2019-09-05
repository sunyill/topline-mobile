/*
 * @Description: 相对时间的过滤器  from xx时间后   to xxx时间前   汉化
 * @Author: your name
 * @Date: 2019-09-05 22:09:48
 * @LastEditTime: 2019-09-05 22:24:36
 * @LastEditors: Please set LastEditors
 */

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
export const fmDate = (value) => {
  return dayjs().to(dayjs(value))
}
