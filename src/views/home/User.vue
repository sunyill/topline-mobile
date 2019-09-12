<!--
 * @Description: 我的界面
 * @Author: your name
 * @Date: 2019-09-12 12:23:25
 * @LastEditTime: 2019-09-12 13:56:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- // 未登录 -->
  <div>
    <div v-if="!user" class="not-login">
      <div class="circle" @click="handleLogin">
        <span>登录</span>
      </div>
    </div>
    <!-- 显示登录 -->
    <div v-else>
      <van-cell-group class="user-info">
        <van-cell class="base-info" is-link :border="false">
          <div slot="title">
            <img class="avatar" src="http://toutiao.meiduo.site/FgSTA3msGyxp5-Oufnm5c0kjVgW7" alt />
            <span class="title">只是为了好玩儿</span>
          </div>
        </van-cell>
        <van-grid class="data-info" :border="false">
          <van-grid-item>
            <span class="count">1</span>
            <span class="text">头条</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">2</span>
            <span class="text">关注</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">3</span>
            <span class="text">粉丝</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">4</span>
            <span class="text">获赞</span>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <van-cell-group>
        <van-grid clickable>
          <van-grid-item icon="star" text="我的收藏" />
          <van-grid-item icon="chat" text="我的评论" />
          <van-grid-item icon="like" text="我的点赞" />
          <van-grid-item icon="browsing-history" text="浏览历史" />
        </van-grid>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="用户反馈" is-link />
        <van-cell title="小智同学" is-link />
        <van-cell title="系统设置" is-link to="/settings" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'User',
  computed: {
    ...mapState(['user'])
  },

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
.user-info {
  .base-info {
    display: flex;
    align-items: center;
    background-color: #0096fa;
    div {
      display: flex;
      align-items: center;
    }
    .avatar {
      margin-right: 15px;
      width: 50px;
      border-radius: 100%;
    }
  }
  .data-info {
    .text {
      font-size: 14px;
    }
    .count {
      font-size: 12px;
    }
  }
  /deep/ .van-cell__right-icon {
    color: #fff;
  }
  /deep/ .van-grid-item__content {
    background-color: #0096fa;
  }
}
</style>
