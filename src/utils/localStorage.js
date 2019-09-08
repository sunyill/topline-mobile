/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-08 22:38:14
 * @LastEditors: Please set LastEditors
 */
/**
 * 对loaclstorage的一些封装
 */
export const setItem = (key, item) => {
  // if (item instanceof Object) {
  //   item = JSON.stringify(item)
  // }
  window.localStorage.setItem(key, JSON.stringify(item))
}

export const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
