import Vuex from 'vuex'
import Vue from "vue";
import {db} from "./db";
import {auth} from "./auth";
import firebase from 'firebase/app';

Vue.use(Vuex);

const defaultUser = Object.freeze({
    name: '',
    drinks: 0,
    permille: 0
});

const store = new Vuex.Store({
    state: {
        auth: {
            uid: null,
        },
        user: {
            name: '',
            drinks: 0,
            permille: 0
        },
        groups: []
    },
    mutations: {
        auth(state, uid) {
            state.auth.uid = uid;
        },
        user(state, user) {
            state.user = user;
        },
        groups(state, groups) {
            state.groups = groups;
        },
    },
    actions: {
        auth({state, commit}, uid) {
            state.auth.uid = uid;

            if (uid === null) {
                commit('user', {...defaultUser});
                return;
            }

            const ref = db
                .collection('users')
                .doc(uid);

            ref.get()
                .then(user => {
                    if (!user.exists) {
                        ref.set(defaultUser)
                    }
                })
        },
        drink(context, amount) {
            const drinks = Math.max(0, context.state.user.drinks + amount);
            db
                .collection('users')
                .doc(store.state.auth.uid)
                .set({
                    drinks
                }, {merge: true});
        },
        name(context, name) {
            db
                .collection('users')
                .doc(store.state.auth.uid)
                .set({
                    name
                }, {merge: true});
        },
        create({dispatch, state}) {
            const user = db
                .collection('users')
                .doc(state.auth.uid);
            db
                .collection('groups')
                .add({
                    users: [user]
                })
        },
        join({state}, group) {
            const user = db
                .collection('users')
                .doc(state.auth.uid);
            db
                .collection('groups')
                .doc(group)
                .update({
                    users: firebase.firestore.FieldValue.arrayUnion(user)
                });
        },
        leave({state}, id) {
            const user = db
                .collection('users')
                .doc(state.auth.uid);
            db
                .collection('groups')
                .doc(id)
                .update({
                    users: firebase.firestore.FieldValue.arrayRemove(user)
                });
        }
    }
});

auth.onAuthStateChanged(user => {
    store.dispatch('auth', user ? user.uid : null);
});

store.watch(
    state => state.auth.uid,
    () => {
        const user = db
            .collection('users')
            .doc(store.state.auth.uid);

        user.onSnapshot(user => {
            if (user.exists) {
                store.commit('user', user.data());
            }
        });

        db
            .collection('groups')
            .where('users', 'array-contains', user)
            .onSnapshot(snapshot => {
                store.commit('groups', snapshot.docs);
            })

    }
);


export default store;