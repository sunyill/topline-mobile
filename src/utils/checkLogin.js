/*
 * @Description: 判断登录的插件
 * @Author: your name
 * @Date: 2019-09-09 22:49:52
 * @LastEditTime: 2019-09-10 17:22:01
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
          // this.$router.push('/login')
          this.$router.push({
            path: '/login',
            // params路由动态参数  query:查询字符串
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(() => {
          // 点取消取消执行
        })
        return false
      }
      return true
    }
  }
}
