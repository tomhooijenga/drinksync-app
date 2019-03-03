import io from 'socket.io-client'
import store from './store'

let url = 'https://drinksync.herokuapp.com/'
if (process.env.NODE_ENV !== 'production') {
  url = 'http://localhost:8080'
}

const socket = io(url)

socket.on('user.update', user => {
  store.commit('user.update', user)
})

socket.on('group.update', group => {
  store.commit('group.update', group)
})

export default socket
