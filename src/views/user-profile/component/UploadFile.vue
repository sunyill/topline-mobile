<!--
 @Description: 上传图片,弹出对话框
 * @Author: your name
 * @Date: 2019-09-12 14:33:08
 * @LastEditTime: 2019-09-12 15:30:42
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
import { uploadPhoto } from '@/api/user'
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
          onClose: this.handleUploadPhoto()
        }
        )
      }
    },
    // 上传头像
    handleUploadPhoto () {
      this.$dialog.confirm({
        message: '是否确认此图片作为头像?'
      }).then(async () => {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '正在上传...'
        })
        try {
          const data = await uploadPhoto('photo', this.$refs.file.files[0])
          // 通知父组件图片上传成功
          this.$emit('upload-success', data.photo)
          this.$toast.success('头像上传成功')
        } catch (error) {
          this.$toast.fail('头像上传失败')
        }
        // 关闭加载提示
        this.$toast.clear()
      }).catch(() => {
        // 取消上传做处理
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell__title {
  text-align: center;
}
</style>
