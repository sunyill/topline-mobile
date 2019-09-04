import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/index'
import MyTabbar from '@/views/TabBar'
import Login from '../views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/tabbar',
      name: 'tabbar',
      component: MyTabbar,
      children: [{
        path: '/',
        name: 'home',
        component: Home
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
