<!--
 * @Description: 更多操作  : 点赞,取消点赞
 * @Author: your name
 * @Date: 2019-09-09 21:49:18
 * @LastEditTime: 2019-09-09 21:56:47
 * @LastEditors: Please set LastEditors
 -->
<template>
<div class="more-aciton">
    <van-button icon="star-o" round :loading="false" type="danger">点赞</van-button>
    <van-button icon="delete" round :loading="false" type="danger">取消点赞</van-button>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
