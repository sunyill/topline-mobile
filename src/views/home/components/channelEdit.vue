<!--
 * @Description: 负责tab, 点击图标,显示弹出层
 * @Author: wangzhan
 * @Date: 2019-09-07 11:15:21
 * @LastEditTime: 2019-09-07 13:21:05
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
      <van-grid-item v-for="channel in channels" :key="channel.id" title="标题" :text="channel.name">
        <van-icon slot="icon" class="close-icon" name="close" v-show="isEdit">
        </van-icon>
      </van-grid-item>
    </van-grid>
    <!-- 推荐列表 -->
<van-cell title="推荐列表" label="点击添加频道">

</van-cell>
<van-grid>
        <van-grid-item v-for="value in 7" :key="value" text='文字'></van-grid-item>
    </van-grid>
  </van-popup>
</template>

<script>
export default {
  name: 'channelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    channels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 控制是否是编辑模式
      isEdit: false
    }
  }
}
</script>

<style lang='less' scoped>
.close-icon {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
