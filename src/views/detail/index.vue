<!--
 * @Description: 文章详情
 * @Author: your name
 * @Date: 2019-09-08 22:51:21
 * @LastEditTime: 2019-09-09 08:13:42
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <van-nav-bar title="文章详情" left-text="返回" fixed @click-left="$router.back()"/>
    <div class="article">
        <h3 class="article-title">这是标题</h3>
        <!-- 作者信息 -->
        <!-- 文章内容 -->
        <div class="article-content">
            <p>文章内容</p>
            <p>文章内容</p>
            <p>文章内容</p>
            <p>文章内容</p>
        </div>
        <!-- 点赞和取消 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  props: ['id']
}
</script>

<style lang='less' scoped>
.article {
  margin-top: 92px;
  padding: 0px 20px;
  .article-title {
    font-size: 40px;
    font-weight: bold;
  }
  .article-content {
    font-size: 26px;
  }
}
</style>
