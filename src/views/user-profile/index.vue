<!--
 * @Description: 个人信息界面
 * @Author: your name
 * @Date: 2019-09-12 14:10:53
 * @LastEditTime: 2019-09-12 15:23:35
 * @LastEditors: Please set LastEditors
 -->
<template>
<div>
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"

    />
    <van-cell-group>
      <van-cell title="头像" is-link @click="showUploadFile = true">
        <div slot="default">
          <img width="30" height="30" :src="userProfile.photo" alt="">
        </div>
      </van-cell>
      <van-cell title="昵称" is-link :value="userProfile.name" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别" is-link :value="userProfile.gender?'女':'男'" />
      <van-cell title="生日" is-link :value="userProfile.birthday"/>
    </van-cell-group>
    <!-- 弹出上传文件的组件 -->
    <upload-file v-model="showUploadFile" @upload-success = 'hanlePhotoSuccess'></upload-file>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UploadFile from './component/UploadFile'
export default {
  name: 'UserProfile',
  components: {
    UploadFile
  },
  data () {
    return {
      userProfile: {},
      showUploadFile: false
    }
  },
  methods: {
    async loadUserProfile () {
      try {
        const data = await getUserProfile()
        this.userProfile = data
      } catch (error) {
        this.$toast.fail('获取用户信息失败')
      }
    },
    /**
   * @description:头像上传成功
   * @param {type}
   * @return:
   */
    hanlePhotoSuccess (photo) {
      this.userProfile.photo = photo
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style>

</style>
