<!--
 * @Description:避免首页过多的代码
 * @Author: your name
 * @Date: 2019-09-05 22:32:04
 * @LastEditTime: 2019-09-06 19:39:03
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- // 弹出框 -->
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    title="标题"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <van-cell-group v-show="!showReports">
      <van-cell title="不感兴趣" icon="location-o" />
      <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="showReports=true" />
      <van-cell title="拉黑作者" icon="location-o" />
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
  }
}
</script>

<style>
</style>
