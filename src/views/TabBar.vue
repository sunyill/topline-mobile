<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-12 13:54:58
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#07c160" route>
      <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o" to="/video">视频</van-tabbar-item>
      <!-- 根据是否登录,显示页面 -->
      <van-tabbar-item name="setting" icon="setting-o" to="/user">{{user?'我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'tabBar',
  data () {
    return {
      active: 'home'
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
</style>
