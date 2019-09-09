<!--
 * @Description: 作者信息组件
 * @Author: your name
 * @Date: 2019-09-09 19:05:10
 * @LastEditTime: 2019-09-09 22:30:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="auth-info">
    <div class="bar-info">
      <img :src="article.aut_photo" class="avatar" alt />
      <div>
        <p>{{article.aut_name}}</p>
        <p>{{article.pubdate | fmDate}}</p>
      </div>
    </div>
    <div>
      <van-button type="danger" :loading="loading" @click="handleFollow">{{article.is_followed?'已':''}}关注</van-button>
    </div>
  </div>
</template>

<script>
import { followUser, unFollowUser } from '@/api/user'
export default {
  name: 'authorInfo',
  props: ['article'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async handleFollow () {
      this.loading = true
      // 判断是否登录
      try {
        // 判断是否已经关注
        if (this.article.is_followed) {
          // 如果已经关注，取消关注
          await unFollowUser(this.article.aut_id)
          this.article.is_followed = false
        } else {
          // 如果没有关注，关注
          await followUser(this.article.aut_id)
          this.article.is_followed = true
        }
      } catch (err) {
        // console.log(err)
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style lang='less' scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }
}
</style>
