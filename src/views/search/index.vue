<!--
 * @Description: search页面
 * @Author: your name
 * @Date: 2019-09-07 21:34:09
 * @LastEditTime: 2019-09-07 22:40:35
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
      @input="handleInput"
      clearable
      background="#57bd6a"
    />
    <!-- 搜索提示 -->
    <van-cell-group v-show="value">
      <van-cell v-for="item in suggestList" :key="item" :title="item" icon="search" />

    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 右侧显示内容 -->
        <div>
          <span>全部删除</span>&nbsp;
          <span>完成</span>&nbsp;
          <van-icon name="delete" size="16px"></van-icon>
        </div>
      </van-cell>
      <van-cell title="花海" icon="hot-o">
        <!-- 右侧显示内容 -->
        <van-icon name="close" size="18px" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
export default {
  data () {
    return {
      value: '',
      // 存放搜索建议的数组
      suggestList: []
    }
  },
  methods: {
    onSearch () {},
    onCancel () {},
    /**
   * @description: 搜索input 获取焦点的时刻触发的时间
   * @param {type}
   * @return:
   */
    async  handleInput () {
      try {
        const data = await getSuggestion(this.value)
        this.suggestList = data.options
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
</style>
