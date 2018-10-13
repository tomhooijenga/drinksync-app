import io from 'socket.io-client';
import store from "./store";

let url = 'https://drinksync.herokuapp.com/';
if (process.env.NODE_ENV !== 'production') {
    url = 'http://localhost:8080';
}

const socket = io(url);

socket.on('user.join', function (data) {
    store.commit('user.join', data);
});

socket.on('user.update', function (user) {
    store.commit('user.update', user);
});

socket.on('group.get', function (group) {
    store.commit('group.update', group);
});

socket.on('group.update', function (group) {
    store.commit('group.update', group);
});

export default socket;