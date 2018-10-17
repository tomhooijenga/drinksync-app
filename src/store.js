import Vuex from 'vuex'
import Vue from "vue";
import socket from "./api";

Vue.use(Vuex);

const emptyGroup = {
    name: '',
    users: []
};

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token'),
        user: {
            id: null,
            name: '',
            drinks: 0,
            ppm: 0
        },
        groups: {},
        users: {}
    },
    getters: {
        group(state) {
            return function (name) {
                return state.groups[name] || emptyGroup;
            }
        }
    },
    mutations: {
        'user.join'(state, {user, groups}) {
            const {token, ...rest} = user;
            state.token = token;
            state.user = rest;

            store.commit('user.update', rest);

            groups.forEach(group => {
                store.commit('group.update', group);
            });
        },
        'user.update'(state, user) {
            if (state.user.id === user.id) {
                state.user = user;
            }

            Vue.set(state.users, user.id, user);
        },
        'group.update'(state, group) {
            Vue.set(state.groups, group.name, group);
            group.users.forEach(user => store.commit('user.update', user));
        }
    },
    actions: {
        'user.join'({state}) {
            socket.emit('user.join', state.token);
        },
        'user.update'({state, commit}, data) {
            socket.emit('user.update', state.token, data);

            commit('user.update', {
                ...state.user,
                ...data
            })
        },
        'group.get'({state}, name) {
            socket.emit('group.get', state.token, name);
        },
        'group.create'({state, commit}) {
            socket.emit('group.create', state.token, group => {
                commit('group.update', group);
            });
        },
        'group.join'({state}, name) {
            socket.emit('group.join', state.token, name);
        },
        'group.leave'({state}, name) {
            socket.emit('group.leave', state.token, name);
        }
    }
});

store.watch(() => store.state.token, (next) => {
    localStorage.setItem('token', next);
});

export default store;