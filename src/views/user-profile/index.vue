<!--
 * @Description: 个人信息界面
 * @Author: your name
 * @Date: 2019-09-12 14:10:53
 * @LastEditTime: 2019-09-12 14:26:41
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
      <van-cell title="头像" is-link>
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
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  data () {
    return {
      userProfile: {}
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
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style>

</style>
