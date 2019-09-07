<!--
 * @Description: 负责tab, 点击图标,显示弹出层
 * @Author: wangzhan
 * @Date: 2019-09-07 11:15:21
 * @LastEditTime: 2019-09-07 16:49:49
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    round
    :style="{ height: '80%' }"
  >
    <van-cell icon="cross" @click="$emit('input',false)" />
    <!-- 我的频道界面 -->
    <van-cell title="我的频道" label="点击进入我的频道">
      <van-button round type="danger" size="mini" v-show="!isEdit" @click="isEdit=true">编辑</van-button>
      <van-button round type="danger" size="mini" v-show="isEdit" @click="isEdit=false">完成</van-button>
    </van-cell>
    <van-grid>
      <van-grid-item
        v-for="(channel,index) in channels"
        :key="channel.id"
        @click="handleMyChannelItem(index,channel.id)"
      >
        <div
          slot="text"
          class="van-grid-item__text"
          :class="{ active: active === index }"
        >{{ channel.name }}</div>
         <!-- 推荐模式下,的索引为0 -->
        <van-icon slot="icon" class="close-icon" name="close" v-show="isEdit && index!=0"></van-icon>
      </van-grid-item>
    </van-grid>
    <!-- 推荐列表 -->
    <van-cell title="推荐列表" label="点击添加频道"></van-cell>
    <van-grid>
      <van-grid-item v-for="channel in RecommandChannel" @click="handleChannelItem(channel)" :key="channel.id" :text="channel.name"></van-grid-item>
    </van-grid>
  </van-popup>
</template>

<script>
import { getAllChannels, deleteChannel, addChannel } from '@/api/channel'
import { setItem } from '@/utils/localStorage'
import { mapState } from 'vuex'
export default {
  name: 'channelEdit',
  props: {
    // 接收当前频道的索引
    value: {
      type: Boolean,
      required: true
    },
    channels: {
      type: Array,
      required: true
    },
    // 接收当前显示的频道的索引
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 控制是否是编辑模式
      isEdit: false,
      // 用来存储所有的频道的数组
      AllChannels: []
    }
  },
  computed: {
    ...mapState(['user']),
    RecommandChannel () {
      // 获取我的频道中所有的id
      const ids = this.channels.map(channel => {
        return channel.id
      })
      // 过滤所有的id, 将出现在我的频道中的id,进行去除
      return this.AllChannels.filter(channel => {
        return !ids.includes(channel.id)
      })
    }
  },
  methods: {
    // 点击推荐频道
    // 分 登录和 未登录的情况
    async handleChannelItem (channel) {
      this.$set(channel, 'timestamp', null)
      this.$set(channel, 'articles', [])
      this.$set(channel, 'loading', false)
      this.$set(channel, 'finished', false)
      this.$set(channel, 'pullLoading', false)

      // 把点击的 推荐频道推送到我的频道
      this.channels.push(channel)
      if (this.user) {
        // 登录情况下
        try {
          await addChannel(channel.id, this.channels.length)
        } catch (error) {
          this.$toast.fail('操作失败')
        }
      }
      // 没有登录的情况下, 把我的频道存储到本地存储
      setItem('channel', this.channels)
    },
    /**
     * @description:点击我的频道时进行处理
     * @param {type}
     * @return:
     */
    async handleMyChannelItem (index, channelId) {
      // 非编辑模式
      if (!this.isEdit) {
        // 告诉父组件 选择的索引, 关闭对话框
        this.$emit('activeChange', index)
      }
      // 编辑模式, 点击的频道从我的频道中移除
      this.channels.splice(index, 1)
      // 判断是否登录
      if (this.user) {
        // 登录发送请求
        try {
          await deleteChannel(channelId)
        } catch (error) {
          this.$toast.fail('操作失败')
        }
      }
      // 没有登录, 把频道记录到本地进行储存
      setItem('channels', this.channels)
    },
    // 加载所有的频道列表
    async loadAllChannels () {
      try {
        const data = await getAllChannels()
        // 从数据中获取的channels 赋值给数组
        this.AllChannels = data.channels
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style lang='less' scoped>
.close-icon {
  position: absolute;
  top: 0;
  right: 0;
}
.active {
  color: red;
}
</style>
