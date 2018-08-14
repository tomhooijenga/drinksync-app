import Vuex from 'vuex'
import Vue from "vue";
import socket from "./api";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {
            id: 0,
            name: '',
            drinks: 0,
            permille: 0,
            groups: []
        },
        users: {},
        groups: {},
        token: ''
    },
    mutations: {
        user(state, user) {
            Vue.set(state.users, user.id, user);

            if (state.user.id == user.id) {
                state.user = user;
            }
        },
        drink(state, drinks) {
            state.user.drinks = Math.max(0, state.user.drinks + drinks);
            state.user.permille = Math.max(0, state.user.permille + drinks * 0.2);

            console.log(drinks, state.user.permille)
        },
        name(state, name) {
            state.user.name = name;
        },
        join(state, id) {
            state.user.groups.push(id);
            state.groups[id].users.push(state.user.id);
        },
        leave(state, id) {
            const user = state.user;
            const group = state.groups[id];
            user.groups.splice(user.groups.indexOf(id), 1);
            group.users.splice(group.users.indexOf(user.id), 1);
        }
    },
    actions: {
        drink({commit, state}, amount) {
            commit('drink', amount);

            socket.emit('user.update', {
                token: state.token,
                drinks: amount
            });
        },
        name({commit, state}, name) {
            commit('name', name);

            socket.emit('user.update', {
                token: state.token,
                name
            });
        },
        get(store, id) {
            socket.emit('group.get', id);
        },
        create({commit, state}) {
            socket.emit('group.create', state.token);
        },
        join({commit, state}, id) {
            commit('join', id);

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

