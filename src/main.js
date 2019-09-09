/*
 * @Description: In User Settings Edit
 * @Author: wangzhan
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-09 23:14:29
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.less'
import { fmDate } from '@/utils/dayJs'
import VeeValidate, { Validator } from 'vee-validate'
// 导入VeeValidate的中文包
import zhCN from 'vee-validate/dist/locale/zh_CN'
// 全局注册登录插件
import checkLogin from '@/utils/checkLogin'
Vue.use(checkLogin)
// 获取相对时间的过滤器
Vue.filter('fmDate', fmDate)
Vue.use(Vant)
Vue.use(VeeValidate, {
  // 文本框触发验证的事件,默认是input, 如果events 设置为空的话, 文本框输入过程中不验证,需要调用validate才验证
  events: ''
})
// 配置中文 注意：这句代码一定要在 Vue.use(VeeValidate) 之后
Validator.localize('zhCN', zhCN)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
