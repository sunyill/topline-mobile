/**
 * 对loaclstorage的一些封装
 */
export const setItem = (item, key) => {
  if (item instanceof Object) {
    item = JSON.stringify(item)
  }
  window.localStorage.setItem(item, JSON.stringify(item))
}

export const getItem = (item) => {
  window.localStorage.getItem(item)
}

export const removeItem = (item) => {
  window.localStorage.removeItem(item)
}
