<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-10 17:30:25
 * @LastEditTime: 2019-09-10 17:35:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-popup
    :value="value"
    @input="$store.commit('setShowReplyList',$event)"
    position="bottom"
    :style="{height:'80%'}"
  >hello
  </van-popup>
</template>

<script>
export default {
  name: 'ReplyList',
  props: ['value']
}
</script>

<style>
</style>
