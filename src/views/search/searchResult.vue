<!--
 * @Description: 搜索结果页面
 * @Author: your name
 * @Date: 2019-09-08 19:40:58
 * @LastEditTime: 2019-09-08 20:41:51
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <van-nav-bar title="搜索结果" left-text="返回" fixed left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多数据了" @load="onload">
      <van-cell v-for="item in list" :key="item" :title="item">

      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'searchResult',
  // 使用props 来接收动态路由后 传递的值
  props: ['q'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onload () {
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

<style lang="less" scoped>
.van-list{
    margin-top: 46px;
}
</style>
