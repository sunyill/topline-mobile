/*
 * @Description: 配置路由界面
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-08 19:43:23
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
      name: 'search-result',
      component: () => import(/* webpackChunkName: "search-result" */ '../views/search/searchResult')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
