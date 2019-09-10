<!--
 * @Description: 发布评论
 * @Author: your name
 * @Date: 2019-09-10 15:36:43
 * @LastEditTime: 2019-09-10 17:18:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content"/>
    </div>
    <div class="more-warap">
      <van-icon v-if="!isArticle" name="star-o"></van-icon>
      <van-button @click="handleSend" size="small" type="info" >发布</van-button>
    </div>
  </div>
</template>

<script>
import { sendComment } from '@/api/comment'
export default {
  name: 'sendComment',
  props: ['isArticle', 'target'],
  data () {
    return {
      content: ''
    }
  },
  methods: {
    async handleSend () {
      // 判断是否登录
      if (!this.$checkLogin()) {
        // 没有登录
        return
      }
      if (this.content.length === 0) {
        this.$toast('请输入评论内容')
        return
      }
      try {
        const data = await sendComment({
          target: this.target,
          content: this.content
        })
        console.log(data)
        // 清空输入
        this.content = ''
      } catch (error) {
        console.log(error)
        this.$toast.fail('发送评论失败')
      }

      // 发布评论
    }
  }
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
