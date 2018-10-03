<style>
    @import "../styles/Button.css";
    @import "../styles/Input.css";

    .user {
        box-shadow: 0px 7px 7px -5px rgba(0, 0, 0, .4) inset;
        padding: 1rem 10vw;
        display: flex;
        flex-direction: row;
    }
    .user__name {
        flex: 3;
    }

    .user__data {
        flex: 1;
        text-align: right;
    }

    .code {
        margin: 2rem 10vw;
    }

    .controls {
        text-align: center;
    }
</style>

<template>
    <section v-if="group">
        <GroupEntry :group="group" :classes="['group', 'group--header']"/>

        <section class="user"
                 v-for="user in users">
            <span class="user__name">
                {{user.name}}
            </span>
            <span class="user__data">
                {{user.drinks}}
            </span>
            <span class="user__data">
                {{user.permille.toFixed(2)}} &permil;
            </span>
        </section>

        <section class="code">
            <input type="text" class="input" :value="url" disabled/>
        </section>
        <section class="controls">
            <button type="button"
                    class="button button--outline"
                    v-on:click="leave"
                    v-if="true">
                Leave this group
            </button>
            <button type="button" class="button button--outline"
                    v-on:click="join"
                    v-if="true">
                Join this group
            </button>
        </section>
    </section>
</template>

<script>
    import GroupEntry from './GroupEntry'
    import {db} from '../api/db'

    export default {
        components: {
            GroupEntry
        },
        data() {
            return {
                group: null,
                users: []
            }
        },
        beforeMount() {
            // fetch group from FireStore
            db
                .collection('groups')
                .doc(this.$route.params.id)
                .onSnapshot(doc => {
                    this.group = doc;
                    this.users = {};

                    doc
                        .data()
                        .users
                        .forEach(user => {
                            user.onSnapshot(user => {
                                this.users = {
                                    ...this.users,
                                    [user.id]: user.data()
                                };
                            })
                        })
                });
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            url() {
                return window.location.origin + '/' + this.$router.resolve({
                    name: 'group',
                    params: {
                        id: this.$route.params.id
                    }
                }).href
            }
        },
        methods: {
            leave() {
                this.$store.dispatch('leave', this.$route.params.id);
            },
            join() {
                this.$store.dispatch('join',  this.$route.params.id);
            }
        }
    }
</script>