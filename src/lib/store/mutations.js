import Vue from "vue";
import store from "./index";

export default {
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
}