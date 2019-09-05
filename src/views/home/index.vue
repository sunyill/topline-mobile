<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 08:04:40
 * @LastEditTime: 2019-09-05 20:28:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <van-nav-bar title="首页头条" fixed />

    <van-tabs animated v-model="activeIndex">
      <!-- 不同的tab页有不同的列表 -->
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <van-pull-refresh v-model="currentChannel.pullLoading" @refresh="onRefresh">
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 遍历tab栏处 -->
            <van-cell
              v-for="article in currentChannel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">问答</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getDefaultOrUserList } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  name: 'Home',
  data () {
    return {
      // 通过activeIndex 的索引, 来找到当前的频道对象
      activeIndex: 0,
      // 频道列表
      channels: [],
      active: 'home'
      // list: [],
      // loading: false,
      // finished: false
    }
  },
  computed: {
    // 返回当前的频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  created () {
    this.loadChannel()
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    },
    /**
     * @description:加载频道列表
     * @param {type}
     * @return:
     */
    async loadChannel () {
      try {
        const data = await getDefaultOrUserList()

        data.channels.forEach(channel => {
          // 给所有的频道设置时间戳和文章数组
          channel.timestamp = null
          channel.articles = []
          channel.loading = false
          channel.finished = false
          channel.pullLoading = false
        })
        this.channels = data.channels
      } catch (error) {
        this.currentChannel.finished = true
        console.log(error)
      }
    },
    onChange (event) {
      console.log(event)
    },
    /**
     * @description:列表中数据加载的方法
     * @param {type}
     * @return:
     */
    async onLoad () {
      // 异步更新数据
      const data = await getArticles({
        // 获取列表中 所有的时间戳 及 文章数组
        channelId: this.currentChannel.id,
        timestamp: this.currentChannel.timestamp || Date.now(),
        withTop: 1
      })
      // 记录文章列表, 记录最后一调数据的时间戳
      this.currentChannel.timestamp = data.pre_timestamp
      this.currentChannel.articles.push(...data.results)
      // this.loading = false
      this.currentChannel.loading = false
      // 文章加载完毕, 如果一个频道的finished执行完毕, 其他tab页的finished也执行完毕
      if (data.results.length === 0) {
        this.currentChannel.finished = true
      }
    }
  }
}
</script>
<style lang='less' scoped>
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 10;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
</style>
