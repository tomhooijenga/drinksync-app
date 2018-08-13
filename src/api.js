import io from 'socket.io-client';
import Vue from 'vue';
import store from "./store";

let url = 'http://drinksync-2-drinksync.7e14.starter-us-west-2.openshiftapps.com/';
if (process.env !== 'production') {
    url = 'http://localhost:8080';
}
const socket = io(url);

socket.on('connect', function () {
    socket.emit('user.join', store.state.token);
});

socket.on('user.join', function ({token, user}) {
    store.state.token = token;
    store.state.user = user;
});

socket.on('user.update', function (user) {
    Vue.set(store.state.users, user.id, user);
});

socket.on('group.update', function (group) {
    Vue.set(store.state.groups, group.id, group);
});

export default socket;