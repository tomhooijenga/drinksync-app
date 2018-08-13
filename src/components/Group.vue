<style>
    @import "../styles/Button.css";
    @import "../styles/Input.css";

    .user {
        box-shadow: 0px 7px 7px -5px rgba(0, 0, 0, .4) inset;
        padding: 1rem 10vw
    }

    .user__drinks {
        float: right;
    }

    .code {
        margin: 2rem 10vw;
    }

    .leave {
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
            <span class="user__drinks">
                {{user.drinks}}
            </span>
        </section>
        <section class="code">
            <input type="text" class="input" :value="url" disabled/>
        </section>
        <section class="leave">
            <button type="button" class="button button--outline" v-on:click="leave">
                Leave this group
            </button>
        </section>
    </section>
</template>

<script>
    import GroupEntry from './GroupEntry'

    export default {
        components: {
            GroupEntry
        },
        computed: {
            group() {
                return this.$store.state.groups[this.$route.params.id]
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
                    name: 'join',
                    params: {
                        id: this.$route.params.id
                    }
                }).href
            }
        },
        methods: {
            leave() {
                this.$store.dispatch('leave', this.$route.params.id);

                this.$router.push({
                    name: 'index'
                })
            }
        }
    }
</script>