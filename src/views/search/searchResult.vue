<!--
 * @Description: 搜索结果页面
 * @Author: your name
 * @Date: 2019-09-08 19:40:58
 * @LastEditTime: 2019-09-08 19:52:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <van-nav-bar title="搜索结果" left-text="返回" left-arrow @click-left="$router.back()">

    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'searchResult',
  // 使用props 来接收动态路由后 传递的值
  props: ['q']
}
</script>

<style>
</style>
