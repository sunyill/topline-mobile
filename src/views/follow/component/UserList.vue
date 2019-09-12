<!--
 @Description: 用户列表
 * @Author: your name
 * @Date: 2019-09-12 16:17:09
 * @LastEditTime: 2019-09-12 16:41:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item.id.toString()" :title="item.name" />
  </van-list>
</template>

<script>
import { getFollowings, getFollowers } from '@/api/user'
export default {
  name: 'UserList',
  // 0 关注用户列表  1 粉丝列表
  props: ['type'],
  data () {
    return {
      list: [],
      finished: false,
      loading: false,
      page: 1,
      per_page: 10
    }
  },
  methods: {
    async onLoad () {
      try {
        let data = null
        if (this.type === 0) {
          // 获取关注用户
          data = await getFollowings({
            page: this.page,
            per_page: this.per_page
          })
        } else {
          data = await getFollowers({
            page: this.page,
            per_page: this.per_page
          })
        }
        this.page++
        this.list.push(...data.results)
        this.loading = false
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

<style>
</style>
