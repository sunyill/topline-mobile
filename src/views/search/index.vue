<!--
 * @Description: search页面
 * @Author: your name
 * @Date: 2019-09-07 21:34:09
 * @LastEditTime: 2019-09-08 21:07:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(value)"
      @cancel="onCancel"
      @input="handleInput"
      clearable
      background="#57bd6a"
    />
    <!-- 搜索提示  将搜索的内存高亮展示-->
    <van-cell-group v-show="value">
      <van-cell v-for="item in suggestList"
      :key="item"
      @click="onSearch(item)"
      :title="item"
       icon="search" >
      <div slot="title" v-html="highlight(item)">

      </div>
      </van-cell>

    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 右侧显示内容 -->
        <div v-show="isEdit" style="display:inline-block">
          <span @click="handleAllDelete">全部删除</span>&nbsp;
          <span @click="isEdit=false">完成</span>&nbsp;
        </div>
          <van-icon v-show="!isEdit" name="delete" size="16px" @click="isEdit=true"></van-icon>
      </van-cell>
      <!-- 展示搜索历史item -->
      <van-cell
       icon="hot-o"
       @click="onSearch(item)"
       v-for="(item,index) in histories"
       :key="index"
       :title="item">
        <!-- 右侧显示内容 -->
        <van-icon name="close" size="18px" v-show="isEdit" @click="handleDelete(index)" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import * as localStorage from '../../utils/localStorage'
import { getSuggestion } from '@/api/search'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      value: '',
      // 编辑模式
      isEdit: false,
      // 存放搜索建议的数组
      suggestList: [],
      // 历史记录的数组
      histories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onSearch (item) {
      this.$router.push({
        name: 'search-result',
        params: {
          q: item
        }
      })
      if (this.histories.includes(item)) {
        // return
      }
      // 记录搜索历史
      this.histories.push(item)
      // 判断用户是否登录
      if (this.user) {
        // return
      }
      // 没有登录
      localStorage.setItem('history', this.histories)
    },
    onCancel () {
      this.$toast.fail('取消搜索')
    },

    handleDelete (index) {
      this.histories.splice(index, 1)
      localStorage.setItem('history', this.histories)
    },
    /**
     * @description: 进行高亮显示
     * @param {type} item是提示内容    'gi':指全局的 忽略大小写
     * @return:
     */
    highlight (item) {
      let reg = new RegExp(this.value, 'gi')
      return item.replace(reg, `<span style="color:red">${this.value}</span>`)
    },
    /**
     * @description: 全部删除历史记录
     * @param {type}
     * @return:
     */
    handleAllDelete () {
      this.histories = []
      window.localStorage.clear()
    },
    /**
   * @description: 搜索input 获取焦点的时刻触发的事件
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
  },
  created () {
    if (this.user) {
      // 如果用户存在,服务器获取数据
      return
    }
    // 没登录,本地获取,  第一次获取的话,可能是空, 返回为null
    this.histories = localStorage.getItem('history') || []
  }
}
</script>

<style>
</style>
