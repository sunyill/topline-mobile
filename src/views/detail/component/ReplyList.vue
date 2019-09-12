<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-10 17:30:25
 * @LastEditTime: 2019-09-12 12:27:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-popup
    :value="value"
    @input="$store.commit('setShowReplyList',$event)"
    position="bottom"
    v-if="currentComment"
    :style="{height:'80%'}"
  >
    <van-nav-bar :title="currentComment.reply_count+'条评论'" />
  </van-popup>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ReplyList',
  props: ['value'],
  computed: {
    ...mapState(['currentComment'])
  }
}
</script>

<style>
</style>
