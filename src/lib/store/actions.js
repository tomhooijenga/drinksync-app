import socket from '../api'

export default {
  'user.join' ({ commit, state }) {
    socket.emit('user.join', state.token, data => {
      commit('user.join', data)
    })
  },
  'user.update' ({ state, commit }, data) {
    socket.emit('user.update', state.token, data)

    commit('user.update', {
      ...state.user,
      ...data
    })
  },
  'group.get' ({ state }, name) {
    socket.emit('group.get', state.token, name)
  },
  'group.create' ({ state, commit }) {
    socket.emit('group.create', state.token, group => {
      commit('group.update', group)
    })
  },
  'group.join' ({ state }, name) {
    socket.emit('group.join', state.token, name)
  },
  'group.leave' ({ state }, name) {
    socket.emit('group.leave', state.token, name)
  }
}
