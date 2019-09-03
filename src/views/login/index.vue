<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <!-- :error-message="errors.first('mobile')"     展示错误的信息提示 -->
      <van-field
        v-model="user.mobile"
        v-validate="'required|digits:11'"
        name="mobile"
        clearable
        :error-message="errors.first('mobile')"
        left-icon="phone-o"
        placeholder="请输入手机号码"
      />
      <van-field
        v-validate="'required|digits:6'"
        name="code"
        v-model="user.code"
        left-icon="star-o"
        clearable
        :error-message="errors.first('code')"
        placeholder="请输入验证码"
      >
        <van-button slot="button" round type="primary" size="small">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn">
      <van-button class="btn" type="primary" @click="handleLogin" :loading='loading' loading-type='spinner' loading-text='正在加载中...' >登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  loading: false,
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    // 处理登录请求
    async handleLogin () {
      this.loading = true
      try {
        const valid = await this.$validator.validate()
        if (!valid) {
          return
        }
        // 验证成功
        const data = await login(this.user)

        // let result = await login(this.user)
        // this.$store.commit('setUser', result)
        this.setUser(data)
        this.$router.push('/')
        this.$toast.success('登录成功呦')
        console.log(data)
      } catch (error) {
        this.$toast.fail('用户名或密码错误')
        console.log(error)
      }
      this.loading = false
    }
  },
  created () {
    const myVerify = {
      custom: {
        mobile: {
          required: '请输入手机号码',
          digits: '手机号码必须为11位数字喔'
        },
        code: {
          required: '请输入验证码',
          digits: '验证为6位数字'
        }
      }
    }
    this.$validator.localize('custom', myVerify)
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
