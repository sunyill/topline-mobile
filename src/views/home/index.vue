<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 08:04:40
 * @LastEditTime: 2019-09-10 14:14:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <van-nav-bar title="首页头条" fixed />

    <van-tabs animated v-model="activeIndex">
      <!-- 显示在右侧的展示列表小图标 -->
      <van-icon name="wap-nav" slot="nav-right" class="nav-btn" @click="showChannelEdit=true" />
      <!-- 不同的tab页有不同的列表 -->
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <van-pull-refresh
          v-model="currentChannel.pullLoading"
          @refresh="onRefresh"
          :success-text="successText"
          animation-duration:2000
        >
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
              @click="$router.push({ name: 'detail', params: { id: article.art_id.toString() } })"
            >
              <div slot="label">
                <!-- grid 显示封面,article.cover.type     0表示没有封面,1==1个图片, 3 ==三个图片 -->
                <van-grid v-if="article.cover.type" :border="false" :column-num="3">
                  <van-grid-item v-for="(imgs, index) in article.cover.images" :key="imgs+index">
                    <van-image lazy-load height="80" :src="imgs">
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                      <!-- 自定义加载失败 -->
                      <template v-slot:error>加载失败</template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <p>
                  <span>{{article.aut_name}}</span>&nbsp;
                  <span>{{article.comm_count}}</span>&nbsp;
                  <span>{{article.pubdate |fmDate}}</span>&nbsp;
                  <!-- 点击x按钮，记录当前的文章对象, -->
                  <van-icon name="cross" class="close" @click.stop="handleAction(article)" />
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出层组件 -->
    <more-action
      v-model="showMoreAction"
      v-if="currentArticle"
      @handleSuccess="handleSuccess"
      :article="currentArticle"
    ></more-action>
    <!-- 弹出频道管理 -->
    <!-- 接收从子频道传递最后一项索引 -->
    <channel-edit v-model="showChannelEdit" @last='handleLast' :channels='channels' @activeChange="handleChange" :active="activeIndex"></channel-edit>
  </div>
</template>

<script>
import Vue from 'vue'
import { getDefaultOrUserList } from '@/api/channel'
import { getArticles } from '@/api/article'
import { getItem, setItem } from '@/utils/localStorage'
import { Lazyload } from 'vant'
import MoreAction from './components/MoreAction'
import channelEdit from './components/channelEdit'

Vue.use(Lazyload)
export default {
  components: { MoreAction, channelEdit },
  name: 'Home',
  data () {
    return {
      // 显示在tab右侧的点击展开小图标
      showChannelEdit: false,
      showMoreAction: false,
      // 通过activeIndex 的索引, 来找到当前的频道对象
      activeIndex: 0,
      // 频道列表
      channels: [],
      successText: '',
      // 点击图标x的时候,记录当前的文章对象
      currentArticle: null
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

  methods: {
    // 处理最后一项索引
    handleLast () {
      this.activeIndex--
    },
    /**
     * @description: 频道管理中,点击我的频道,索引变化时执行
     * @param {type}
     * @return:
     */
    handleChange (index) {
      this.activeIndex = index
      this.showChannelEdit = false
    },
    /**
     * @description: 子给父传递的数据,操作成功做的处理
     * @param {type}
     * @return:
     */
    handleSuccess () {
      this.showMoreAction = false
      // 找到此条数据在频道中的索引
      const articles = this.currentChannel.articles
      const index = articles.findIndex(article => {
        return article.art_id === this.currentArticle.art_id
      })
      articles.splice(index, 1)
    },
    /**
     * @description: 点击x按钮, 弹出Moreaction, 并且记录当前的文章对象
     * @param {type}
     * @return:
     */
    handleAction (article) {
      this.showMoreAction = true
      this.currentArticle = article
    },
    /**
     * @description: onRefresh() 下拉刷新功能
     * @param {type}
     * @return:
     */
    async onRefresh () {
      try {
        const data = await getArticles({
          channelId: this.currentChannel.id,
          timestamp: Date.now(),
          withTop: 1
        })
        this.currentChannel.pullLoading = false
        this.currentChannel.articles.unshift(...data.results)
        this.successText = `此次成功加载了${data.results.length}条数据`
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description:加载频道列表
     * @param {type}
     * @return:
     */
    async loadChannel () {
      try {
        let channels = []
        // 如果存在用户的登录信息的话
        if (this.$store.state.user) {
          const data = await getDefaultOrUserList()
          channels = data.channels
        } else {
          // 2. 如果用户没有登录，先去本地存储中获取数据，如果没有数据再发送请求
          // 如果本地存储中没有值，获取的是null
          channels = getItem('channels')
          if (!channels) {
            const data = await getDefaultOrUserList()
            channels = data.channels
            setItem('channels', channels)
          }
        }
        channels.forEach(channel => {
          channel.timestamp = null
          channel.articles = []
          channel.loading = false
          channel.finished = false
          channel.pullLoading = false
        })
        // data.channels.forEach(channel => {
        //   // 给所有的频道设置时间戳和文章数组
        //   channel.timestamp = null
        //   channel.articles = []
        // })
        this.channels = channels
      } catch (error) {
        this.currentChannel.finished = true
        console.log(error)
      }
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
  },
  created () {
    this.loadChannel()
    // console.log('created')
  }
  // activated () {
  //   console.log('activated ')
  // },
  // deactivated () {
  //   console.log('deactivated')
  // }
}
</script>
<style lang='less' scoped>
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 10px;
    z-index: 10;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
.close {
  float: right;
}
.nav-btn {
  position: fixed;
  right: 10px;
  line-height: 44px;
  font-size: 22px;
  opacity: 0.8;
  background: #fff;
}
</style>
