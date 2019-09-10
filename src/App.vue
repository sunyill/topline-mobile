<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-10 11:02:29
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- Props：使用keep-alice来缓存动态切换的组件
  include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
  exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
  max - 数字。最多可以缓存多少组件实例。-->
  <div id="app">
  <keep-alive exclude="detail">
    <router-view />
  </keep-alive>
  </div>
</template>

<style lang="less">
</style>
