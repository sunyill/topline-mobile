<!--
 * @Description: 负责tab, 点击图标,显示弹出层
 * @Author: your name
 * @Date: 2019-09-07 11:15:21
 * @LastEditTime: 2019-09-07 13:06:47
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
      <van-button round type="danger" size="mini">编辑</van-button>
    </van-cell>
    <van-grid>
      <van-grid-item v-for="value in 8" :key="value" title="标题" text="文字">
        <van-icon slot="icon" class="close-icon" name="close">

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
    }
  },
  data () {
    return {}
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
