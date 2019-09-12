<!--
 @Description: 上传图片,弹出对话框
 * @Author: your name
 * @Date: 2019-09-12 14:33:08
 * @LastEditTime: 2019-09-12 14:35:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-dialog
    :value="value"
    @input="$emit('input', $event)"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <van-cell-group>
      <van-cell title="从相册选择图片" />
      <van-cell title="拍照" />
      <van-cell title="取消" @click="$emit('input', false)" />
    </van-cell-group>
  </van-dialog>
</template>

<script>

export default {
  name: 'UploadFile',
  props: ['value']
}
</script>

<style lang="less" scoped>
.van-cell__title {
  text-align: center;
}
</style>
