<!--
 * @Description:我的 - 关注
 * @Author: your name
 * @Date: 2019-09-12 15:35:21
 * @LastEditTime: 2019-09-12 16:11:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="关注/粉丝" left-arrow @click-left="$router.back()" />
    <!-- tabs -->
    <van-tabs v-model="active" color="#57bd6a">
      <van-tab title="关注">内容 1</van-tab>
      <van-tab title="粉丝">内容 2</van-tab>
    </van-tabs>
    <!-- list列表 -->
  </div>
</template>

<script>
export default {
  name: 'Follow',
  data () {
    return {
      active: 1
    }
  },
  created () {

  },
  activated () {
    const type = this.$route.query.type
    if (type === '1') {
      this.active = 0
    } else {
      this.active = 1
    }
  }
}
</script>

<style>
</style>
