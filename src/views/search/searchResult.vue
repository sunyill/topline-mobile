<!--
 * @Description: 搜索结果页面
 * @Author: your name
 * @Date: 2019-09-08 19:40:58
 * @LastEditTime: 2019-09-08 20:59:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <van-nav-bar title="搜索结果" left-text="返回" fixed left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多数据了" @load="onload">
      <van-cell v-for="article in list" :key="article.art_id.toString()" :title="article.title">

      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'searchResult',
  // 使用props 来接收动态路由后 传递的值
  props: ['q'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  methods: {
    async onload () {
      try {
        // 异步更新数据
        const data = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.q
        })
        // 把获取的结果, 放在list中
        this.list.push(...data.results)
        this.page++
        this.loading = false
        // 判断是否加载完毕
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-list{
    margin-top: 46px;
}
</style>
