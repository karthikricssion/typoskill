import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: false
  },
  mutations: {
    setStatus (state, status) {
      state.status = status
    }
  },
  actions: {
    setStatus ({ commit }, status) {
      commit('setStatus', status)
    }
  },
  getters: {
    getStatus: state => {
      return state.status
    }
  }
})