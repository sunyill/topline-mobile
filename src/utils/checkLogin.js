/*
 * @Description: 判断登录的插件
 * @Author: your name
 * @Date: 2019-09-09 22:49:52
 * @LastEditTime: 2019-09-09 22:53:31
 * @LastEditors: Please set LastEditors
 */
export default {
  install (Vue) {
    Vue.prototype.$checkLogin = function () {
      // 判断是否登录
      if (!this.$store.state.user) {
        // 没登录, 提示登录
        this.$dialog.confirm({
          title: '登录提示',
          message: '是否要跳转到登录界面?'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => {
          // 点取消取消执行
        })
        return false
      }
      return false
    }
  }
}
