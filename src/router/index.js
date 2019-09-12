/*
 * @Description: 配置路由界面
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-12 12:32:00
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/index'
import MyTabbar from '@/views/TabBar'
import Login from '../views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'tabbar',
      component: MyTabbar,
      children: [{
        path: '',
        name: 'home',
        component: Home
      }, {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/home/User.vue')
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ '../views/search/index.vue')
    }, {
      // 搜索结果页面路由
      path: '/search-result/:q',
      props: true,
      name: 'search-result',
      component: () => import(/* webpackChunkName: "search-result" */ '../views/search/searchResult')
    }, {
      path: '/detail/:id',
      props: true,
      name: 'detail',
      component: () => import(/* webpackChunkName: "datail" */ '../views/detail')
    }

  ]
})
