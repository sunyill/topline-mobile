<!--
 * @Description: 我的界面
 * @Author: your name
 * @Date: 2019-09-12 12:23:25
 * @LastEditTime: 2019-09-12 13:02:43
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="not-login">
        <div class="circle" @click="handleLogin">
            <span>登录</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'user',
  methods: {
    handleLogin () {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath
        }
      })
    }
  }

}
</script>

<style lang="less">
.not-login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/img/bg_blue_car.png");
  background-size: cover;
  .circle {
    width: 50px;
    height: 50px;
    padding: 20px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
}
</style>
