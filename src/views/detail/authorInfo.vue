<!--
 * @Description: 作者信息组件
 * @Author: your name
 * @Date: 2019-09-09 19:05:10
 * @LastEditTime: 2019-09-09 19:20:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="auth-info">
    <div class="bar-info">
      <img :src="article.aut_photo" class="avatar" alt />
      <div>
        <p>{{article.aut_name}}</p>
        <p>{{article.pubdate | fmDate}}</p>
      </div>
    </div>
    <div>
      <van-button type="danger" :loading="false">关注</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'authorInfo',
  props: ['article']
}
</script>

<style lang='less' scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }
}
</style>
