<!--
 @Description: 上传图片,弹出对话框
 * @Author: your name
 * @Date: 2019-09-12 14:33:08
 * @LastEditTime: 2019-09-12 15:02:08
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
      <van-cell title="从相册选择图片"  @click="handleSelectFile"/>
      <input ref="file" type="file" style="display: none;">
      <van-cell title="拍照" />
      <van-cell title="取消" @click="$emit('input', false)" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
// 引用图片预览
Vue.use(ImagePreview)
export default {
  name: 'UploadFile',
  props: ['value'],
  methods: {
    handleSelectFile () {
      this.$refs.file.click()
      // 给file改变注册事件
      this.$refs.file.onchange = (e) => {
        if (e.target.files.length === 0) {
          return
        }
        // 处理
        // const url = URL.createObjectURL(e.target.files[0])
        const url = URL.createObjectURL(e.target.files[0])
        // 关闭对话框
        this.$emit('input', false)
        // 图片预览
        ImagePreview({
          images: [url],
          showIndex: false,
          onClose () {
            // 操作关闭
          }
        }

        )
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell__title {
  text-align: center;
}
</style>
