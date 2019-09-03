import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.less'
import VeeValidate, { Validator } from 'vee-validate'
// 导入VeeValidate的中文包
import zhCN from 'vee-validate/dist/locale/zh_CN'
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
