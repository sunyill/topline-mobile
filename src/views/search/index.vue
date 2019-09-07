<!--
 * @Description: search页面
 * @Author: your name
 * @Date: 2019-09-07 21:34:09
 * @LastEditTime: 2019-09-07 22:28:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
      background="#57bd6a"
    />
    <van-cell-group>
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <!-- 右侧显示内容 -->
        <div>
          <span>全部删除</span>&nbsp;
          <span>完成</span>&nbsp;
          <van-icon name="delete" size="16px"></van-icon>
        </div>
      </van-cell>
      <van-cell title="单元格" icon="hot-o">
        <!-- 右侧显示内容 -->
        <van-icon name="close" size="18px" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {},
    onCancel () {}
  }
}
</script>

<style>
</style>
