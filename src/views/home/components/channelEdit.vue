<!--
 * @Description: 负责tab, 点击图标,显示弹出层
 * @Author: your name
 * @Date: 2019-09-07 11:15:21
 * @LastEditTime: 2019-09-07 11:18:42
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-popup v-model="show" position="bottom" round :style="{ height: '80%' }" >
      hello
  </van-popup>
</template>

<script>
export default {
  name: 'channelEdit',
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>
</style>
