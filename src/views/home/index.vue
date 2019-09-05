<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 08:04:40
 * @LastEditTime: 2019-09-05 13:12:50
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <van-nav-bar title="首页头条" fixed />

    <van-tabs animated>
      <van-tab :title="index" v-for="index in titleList" :key="index">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">问答</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      active: 'search',
      list: [],
      loading: false,
      finished: false,
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
    },
    /**
     * @description:列表中加载的方法
     * @param {type}
     * @return:
     */
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>
<style lang='less' scoped>
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 10;
  }
  /deep/ .van-tabs__content {
    margin-top: 46px;
    margin-bottom: 50px;
  }
}
</style>
