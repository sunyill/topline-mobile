<!--
 * @Description: 文章详情
 * @Author: your name
 * @Date: 2019-09-08 22:51:21
 * @LastEditTime: 2019-09-10 17:52:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <van-nav-bar
      title="文章详情"
      class="bar_title"
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <div class="article" v-if="article">
      <h3 class="article-title">{{article.title}}</h3>
      <!-- 作者信息 -->
      <author-info :article="article"></author-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content"></div>
      <!-- 点赞和取消 -->
      <moreAction :article="article"></moreAction>
      <!-- 评论列表 -->
      <comment-list :isArticle="true" :id="article.art_id.toString()"></comment-list>
      <!-- 发布评论 -->
      <send-comment :isArticle="true" :target="article.art_id.toString()"></send-comment>
      <!-- 展示评论列表 -->
      <reply-list v-model="showReplyList"></reply-list>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import AuthorInfo from './authorInfo'
import MoreAction from './moreAction'
import CommentList from './component/CommentList'
import SendComment from './component/sendComment'
import ReplyList from './component/ReplyList'
import { mapState } from 'vuex'
export default {
  name: 'detail',
  props: ['id'],
  components: {
    AuthorInfo,
    MoreAction,
    CommentList,
    SendComment,
    ReplyList
  },
  data () {
    return {
      article: null
    }
  },
  computed: {
    ...mapState(['showReplyList'])
  },
  created () {
    this.loadData()
  },
  methods: {
    // 加载文章详情
    async loadData () {
      try {
        const data = await getArticle(this.id)
        this.article = data
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取文章详情失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.article {
  margin-top: 48px;
  padding: 4px 20px;
  .article-title {
    font-size: 20px;
    font-weight: bold;
  }
  .article-content {
    font-size: 14px;
  }
}
</style>
