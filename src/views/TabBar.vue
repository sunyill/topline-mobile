<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-12 12:33:35
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#07c160" route>
      <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'home'
    }
  }
}
</script>

<style>
</style>
