<!--
 @Description: 小智聊天
 * @Author: your name
 * @Date: 2019-09-12 16:47:06
 * @LastEditTime: 2019-09-12 17:16:57
 * @LastEditors: Please set LastEditors
 -->
<template>
<div class="page-user-chat">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <div class="chat-list" ref="chatlist">
      <div
        v-for="chat in list"
        :key="chat.timestamp"
        class="chat-item" :class="chat.robot ? ' left' : ' right'">
        <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="chat-pao">{{ chat.msg }}</div>
      </div>
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value"  placeholder="说点什么...">
        <van-loading v-if="commentLoading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'Chat',
  data () {
    return {
      // 发送消息列表
      list: [],
      socket: null,
      value: '',
      commentLoading: false
    }
  },
  methods: {
    send () {
      const data = {
        robot: false,
        msg: this.value,
        timestamp: Date.now()
      }
      this.list.push(data)
      // 发送消息
      this.socket.send(data)
      //   this.value = ''
      this.update()
    },
    update () {
      // 更新chat-list的scrollTop
      this.$$refs.chatlist.scollTop = this.$refs.chatlist.scrollHeight
    }

  },
  activated () {
    this.socket = io('http://ttapi.research.itcast.cn', {
      query: {
        token: this.$store.state.user.token
      }
    })
    this.socket.on('connect', function () {
      console.log('连接成功')
    })
    // 接收到消息
    this.socket.on('message', (data) => {
      this.list.push({
        robot: true,
        ...data
      })
      // 在接收到消息后 更新滚动条的位置
      this.update()
    })
    this.socket.on('disconnect', function () {
      console.log('dis')
    })
  },
  deactivated () {
    this.socket.close()
  }

}
</script>

<style scoped lang='less'>
.page-user-chat {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 40px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 13px;
          border-top:1px solid #c2d9ea;
          border-right:1px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -6px;
      transform: rotate(-135deg);
    }
  }
}
.van-image{
  width: 40px;
  height: 40px;
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}

</style>
