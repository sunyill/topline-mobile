<!--
 * @Description: 评论, 更多评论列表
 * @Author: your name
 * @Date: 2019-09-10 14:17:36
 * @LastEditTime: 2019-09-10 16:10:31
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了...." @load="onLoad">
    <van-cell v-for="comment in list" :key="comment.com_id.toString()">
      <div slot="icon">
        <img class="avatar" :src="comment.aut_photo" alt />
      </div>
      <div slot="title">
        <span>{{comment.aut_name}}</span>
      </div>
      <div slot="default">
        <!-- plain是否为朴素按钮 -->
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{comment.content}}</p>
        <p>
          <span>{{comment.pubdate | fmDate}}</span>
          <span>回复{{comment.reply_count}}</span>
        </p>
      </div>
    </van-cell>
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'CommentList',
  // isArticle 是否是文章
  // id a是文章的id, c,是评论的id
  props: ['isArticle', 'id'],
  data () {
    return {
      loading: false,
      finished: false,
      // 评论列表
      list: [],
      offset: null,
      limit: 10
    }
  },
  methods: {
    async onLoad () {
      // 获取评论列表
      try {
        const data = await getComments({
          isArticle: this.isArticle,
          source: this.id,
          offset: this.offset,
          limit: this.limit
        })
        // 将获取的最后一条数据存储
        this.offset = data.last_id
        this.list.push(...data.results)
        this.loading = false
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取评论失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.avatar {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-right: 5px;
}
.van-list {
  margin-bottom: 64px;
}
</style>
