<!--
 * @Description: 发布评论
 * @Author: your name
 * @Date: 2019-09-10 15:36:43
 * @LastEditTime: 2019-09-10 15:57:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" />
    </div>
    <div class="more-warap">
      <van-icon v-if="!isArticle" name="star-o"></van-icon>
      <van-button size="small" type="info">发布</van-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'sendComment',
  props: ['isArticle']
}
</script>

<style lang="less" scoped>
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 10px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    height: 25px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 15px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
