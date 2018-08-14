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
        <GroupEntry :id="$route.params.id" :classes="['group', 'group--header']"/>
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
                    v-if="user.groups.includes(group.id)">
                Leave this group
            </button>
            <button type="button" class="button button--outline"
                    v-on:click="join"
                    v-if="user.groups.includes(group.id) === false">
                Join this group
            </button>
        </section>
    </section>
</template>

<script>
    import GroupEntry from './GroupEntry'

    export default {
        mounted() {
          this.$store.dispatch('get', this.$route.params.id);
        },
        components: {
            GroupEntry
        },
        computed: {
            group() {
                return this.$store.state.groups[this.$route.params.id]
            },
            user() {
                return this.$store.state.user
            },
            users() {
                return this.group.users
                    .map(id => {
                        return this.$store.state.users[id];
                    })
                    .filter(user => user)
                    .sort((a, b) => {
                        return b.drinks - a.drinks
                    });
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