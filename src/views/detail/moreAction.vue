<!--
 * @Description: 更多操作  : 点赞,取消点赞
 * @Author: your name
 * @Date: 2019-09-09 21:49:18
 * @LastEditTime: 2019-09-09 22:46:08
 * @LastEditors: Please set LastEditors
 -->
<template>
<div class="more-aciton">
    <van-button
    :icon="article.attitude ===1 ?'star':'star-o'"
@click="handleLike"
    round :loading="false" type="danger">点赞</van-button>
    <van-button icon="delete" round :loading="false" type="danger">取消点赞</van-button>
</div>
</template>

<script>
import { likeArticle, unLikeArticle } from '@/api/article'
export default {
  props: ['article'],
  methods: {
    async  handleLike () {
      // 判断是否登录

      // 点赞或者取消点赞
      try {
        // -1无态度, 0.不喜欢 1 点赞
        if (this.article.attitude === 1) {
          // 如果已点赞,取消点赞
          await unLikeArticle(this.article.art_id)
          this.article.attitude = -1
        } else {
          await likeArticle(this.article.art_id)
          this.article.attitude = 1
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
