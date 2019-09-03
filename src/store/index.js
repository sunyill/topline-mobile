import Vue from 'vue'
import Vuex from 'vuex'
import * as localstorageTool from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 设置存储状态
    user: localstorageTool.getItem('user')
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localstorageTool.setItem('user', user)
    }
  },
  actions: {

  }
})
