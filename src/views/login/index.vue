<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model="user.mobile" left-icon="phone-o" placeholder="请输入手机号码" />
      <van-field v-model="user.code" left-icon="star-o" placeholder="请输入验证码">
        <van-button slot="button" round type="primary" size="small">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn">
        <van-button class="btn" type="primary" @click="handleLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    // 处理登录请求
    async handleLogin () {
      try {
        let result = await login(this.user)
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login-btn {
  padding: 20px;
  .btn {
    width: 100%;
  }
}
</style>
