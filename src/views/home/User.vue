<!--
 * @Description: 我的界面
 * @Author: your name
 * @Date: 2019-09-12 12:23:25
 * @LastEditTime: 2019-09-12 16:57:33
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
        <van-cell class="base-info" @click="$router.push('user-profile')" is-link :border="false">
          <div slot="title">
            <img class="avatar" :src="userInfo.photo" alt />
            <span class="title">{{userInfo.name}}</span>
          </div>
        </van-cell>
        <van-grid class="data-info" :border="false">
          <van-grid-item>
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </van-grid-item>
          <van-grid-item @click="$router.push('/follow?type=1')">
            <span class="count">{{ userInfo.follow_count }}</span>
            <span class="text">关注</span>
          </van-grid-item>
          <van-grid-item @click="$router.push('/follow?type=2')">
            <span class="count">{{userInfo.fans_count}}</span>
            <span class="text">粉丝</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">{{userInfo.like_count}}</span>
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
        <van-cell title="小智同学" is-link  to="/chat"/>
        <van-cell title="系统设置" is-link to="/settings" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'User',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },

  methods: {
    /**
     * @description: 加载用户的信息
     * @param {type}
     * @return:
     */
    async loadUserInfo () {
      if (!this.$checkLogin()) {
        return false
      }
      try {
        const data = await getUserInfo()
        this.userInfo = data
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取用户信息失败')
      }
    },
    handleLogin () {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath
        }
      })
    }
  },
  created () {
    this.loadUserInfo()
  }

}
</script>

<style lang="less" >
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
    background-color: #57bd6a;
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
    background-color: #57bd6a;
  }
}
</style>
