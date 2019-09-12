<!--
 @Description: 用户列表
 * @Author: your name
 * @Date: 2019-09-12 16:17:09
 * @LastEditTime: 2019-09-12 16:20:02
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
</template>

<script>
export default {
  name: 'UserList',
  props: ['type'],
  data () {
    return {
      list: [],
      finished: false,
      loading: false
    }
  },
  methods: {
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

<style>
</style>
