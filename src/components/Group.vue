<style>
    @import "../styles/Button.css";
    @import "../styles/Input.css";

    .user {
        box-shadow: 0px 7px 7px -5px rgba(0, 0, 0, .4) inset;
        padding: 1rem 5vw;
        display: flex;
        flex-direction: row;
    }

    .user__name {
        flex: 3 1;
        word-break: break-word;
    }

    .user__data {
        flex: 1 1 auto;
        text-align: right;
        padding-left: 0.5rem;
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
        <GroupEntry :group="group"/>

        <section class="user"
                 v-for="user in users">
            <span class="user__name">
                {{user.name}}
            </span>
            <span class="user__data">
                {{user.drinks}}
            </span>
            <span class="user__data">
                {{(user.ppm / 1000).toFixed(2)}}&nbsp;&permil;
            </span>
        </section>

        <section class="code">
            <input type="text" class="input" :value="url" disabled/>
        </section>
        <section class="controls">
            <button type="button"
                    class="button button--outline"
                    v-on:click="leave"
                    v-if="joined">
                Leave this group
            </button>
            <button type="button" class="button button--outline"
                    v-on:click="join"
                    v-if="joined === false">
                Join this group
            </button>
        </section>
    </section>
</template>

<script>
    import Vue from 'vue'
    import GroupEntry from './GroupEntry'
    import socket from "../api";

    export default {
        props: {
            id: String,
        },
        mounted() {
            socket.emit('group.get', this.$store.state.token, this.id, group => {
                this.$store.commit('group.update', group);
            });
        },
        beforeDestroy() {
            if (!this.joined) {
                Vue.delete(this.$store.state.groups, this.id);
            }
        },
        components: {
            GroupEntry
        },
        computed: {
            group() {
                return this.$store.state.groups[this.id];
            },
            users() {
                return this.group
                    .users
                    .map(({id}) => this.$store.state.users[id])
                    .sort((a, b) => {
                        return b.drinks - a.drinks
                    });
            },
            url() {
                return window.location.origin + '/' + this.$router.resolve({
                    name: 'group',
                    params: {
                        id: this.id
                    }
                }).href
            },
            joined() {
                const userId = this.$store.state.user.id;

                return this
                    .group
                    .users
                    .find(user => user.id === userId) !== undefined;
            },
        },
        methods: {
            leave() {
                this.$store.dispatch('group.leave', this.id);
            },
            join() {
                this.$store.dispatch('group.join', this.id);
            }
        }
    }
</script>