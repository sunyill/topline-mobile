<!--
 * @Description: 评论, 更多评论列表
 * @Author: your name
 * @Date: 2019-09-10 14:17:36
 * @LastEditTime: 2019-09-10 14:28:14
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了...." @load="onLoad">
    <van-cell v-for="item in list" :key="item">
      <div slot="icon">
        <img class="avatar" src="http://toutiao.meiduo.site/Fn6-mrb5zLTZIRG3yH3jG8HrURdU" alt />
      </div>
      <div slot="title">
        <span>只是为了好玩儿</span>
      </div>
        <div slot="default">
            <!-- plain是否为朴素按钮 -->
            <van-button icon="like-o" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
            <p>hello world</p>
            <p>
                <span>时间</span>
                <span>回复</span>
            </p>
        </div>
    </van-cell>
  </van-list>
</template>

<script>
export default {
  name: 'CommentList',
  data () {
    return {
      loading: false,
      finished: false,
      list: []
    }
  },
  methods: {
    onLoad () {}
  }
}
</script>

<style>
</style>
