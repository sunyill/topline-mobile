<!--
 * @Description: 负责tab, 点击图标,显示弹出层
 * @Author: wangzhan
 * @Date: 2019-09-07 11:15:21
 * @LastEditTime: 2019-09-07 14:37:04
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
      >
        <div
          slot="text"
          class="van-grid-item__text"
          :class="{ active: active === index }"
        >{{ channel.name }}</div>
        <van-icon slot="icon" class="close-icon" name="close" v-show="isEdit"></van-icon>
      </van-grid-item>
    </van-grid>
    <!-- 推荐列表 -->
    <van-cell title="推荐列表" label="点击添加频道"></van-cell>
    <van-grid>
      <van-grid-item v-for="channel in RecommandChannel" :key="channel.id" :text="channel.name"></van-grid-item>
    </van-grid>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api/channel'
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
