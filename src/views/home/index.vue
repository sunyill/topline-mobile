<template>
  <div>
    <van-nav-bar title="首页头条" />

    <van-tabs animated>
      <van-tab :title="index" v-for="index in titleList" :key="index">{{index}}</van-tab>
    </van-tabs>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data () {
    return {
      active: 'search',

      titleList: [
        '面包',
        '花生',
        '糖果',
        '松仁',
        '腰果',
        '苹果',
        '香蕉',
        '橘子'
      ]
    }
  },
  methods: {
    onChange (event) {
      console.log(event)
    }
  }
}
</script>
