/*
 * @Description: In User Settings Editl
 * @Author: your name
 * @Date: 2019-09-05 19:58:52
 * @LastEditTime: 2019-09-10 17:29:29
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as localstorageTool from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 设置存储状态
    user: localstorageTool.getItem('user'),

    // showReplyList 控制回复列表的展示
    showReplyList: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localstorageTool.setItem('user', user)
    },
    setShowReplyList (state, isShow) {
      state.showReplyList = isShow
    }
  },
  actions: {

  }
})
