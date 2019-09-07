<!--
 * @Description:避免首页过多的代码
 * @Author: your name
 * @Date: 2019-09-05 22:32:04
 * @LastEditTime: 2019-09-06 22:44:38
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
      <van-cell v-for="item in reportList" :title="item.title" :key="item" @click="handle('report',item.type)" />

    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle, reportArticle } from '@/api/article'
import { blacklists } from '@/api/user.js'
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
      showReports: false,

      reportList: [
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '错别字多', type: 3 },
        { title: '旧闻重复', type: 4 },
        { title: '广告软文', type: 5 },
        { title: '内容不实', type: 6 },
        { title: '涉嫌违法犯罪', type: 7 },
        { title: '侵权', type: 8 },
        { title: '其他问题', type: 0 }
      ]
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
          this.blacklistUser()
          break
        case 'report':
          break
      }
    },
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
        // 告知父组件, 隐藏,移除掉数据
        this.$emit('handleSuccess')
      } catch (Error) {
        console.log(Error)
        this.$toast.fail('操作失败')
      }
    },
    async blacklistUser () {
      try {
        await blacklists(this.article.aut_id)
        // 通知父组件,拉黑作者
        this.$emit('handleSuccess')
        this.$toast.success('操作成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    async report (reportType) {
      try {
        await reportArticle({
          target: this.article.art_id,
          type: reportType
        })
        // 告知父组件隐藏对话框
        this.$emit('input', false)
        this.$toast.success('操作成功')
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
