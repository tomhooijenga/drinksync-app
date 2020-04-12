import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const emptyGroup = {
  name: '',
  users: []
}

const store = new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['token', 'drinks', 'install.askAgain']
  })],
  state,
  getters: {
    group (state) {
      return function (name) {
        return state.groups[name] || emptyGroup
      }
    }
  },
  mutations,
  actions
})

export default store
