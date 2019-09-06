<!--
 * @Description:避免首页过多的代码
 * @Author: your name
 * @Date: 2019-09-05 22:32:04
 * @LastEditTime: 2019-09-06 20:16:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- // 弹出框 -->
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <van-cell-group v-show="!showReports">
      <van-cell title="不感兴趣" icon="warn-o" @click="handle('dislike')" />
      <van-cell title="反馈垃圾内容" icon="bulb-o" is-link @click="showReports=true" />
      <van-cell title="拉黑作者" icon="closed-eye" @click="handle('blacklist')" />
    </van-cell-group>
    <!-- 举报文章 -->
    <van-cell-group v-show="showReports">
      <van-cell icon="arrow-left" @click="showReports=false" />
      <van-cell title="标题夸张" />
      <van-cell title="低俗色情" />
      <van-cell title="错别字多" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle } from '@/api/article'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 从父组件中传递过来的article
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showConfirmButton: false,
      showReports: false
    }
  },
  created () {
    console.log(this.article.art_id)
  },
  methods: {
    //   通过type参数来执行要判断的内容
    handle (type) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blacklist':
          break
      }
    },
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
      } catch (Error) {
        console.log(Error)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style>
</style>
