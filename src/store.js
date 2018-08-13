import Vuex from 'vuex'
import Vue from "vue";
import socket from "./api";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {
            name: '',
            drinks: 0
        },
        users: {},
        groups: {},
        token: ''
    },
    mutations: {
        drink(state, drinks) {
            state.user.drinks = drinks;
        },
        name(state, name) {
            state.user.name = name;
        },
        leave(state, id) {
            Vue.delete(state.groups, id);
        }
    },
    actions: {
        drink({commit, state}, drinks) {
            commit('drink', drinks);

            socket.emit('user.update', {
                token: state.token,
                drinks
            });
        },
        name({commit, state}, name) {
            commit('name', name);

            socket.emit('user.update', {
                token: state.token,
                name
            });
        },
        create({commit, state}) {
            socket.emit('group.create', state.token);
        },
        join({commit, state}, id) {
            socket.emit('group.join', {
                token: state.token,
                id
            })
        },
        leave({commit, state}, id) {
            commit('leave', id);

            socket.emit('group.leave', {
                token: state.token,
                id
            })
        }
    }
});

store.watch(() => store.state.token, (next) => {
    localStorage.setItem('token', next);
});

if (localStorage.getItem('token')) {
    store.state.token = localStorage.getItem('token');
}

export default store;

