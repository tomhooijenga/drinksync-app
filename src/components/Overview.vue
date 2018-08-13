<style>
    @import "../styles/Button.css";
    @import "../styles/Icons.css";

    .overview {
        flex: 1
    }

    .overview__header {
        padding: 0 10vw;
        font-weight: normal;
        display: flex;
    }

    .overview__header__button {
        align-self: flex-end;
        margin-left: auto;
    }
</style>

<template>
    <section class="overview">
        <h1 class="overview__header">
            Groups
            <button type="button"
                    class="button overview__header__button button--outline button--small"
                    v-on:click="create">
                &plus;
            </button>
        </h1>

        <router-link tag="div"
                     key="group.id"
                     :to="{name: 'group', params: {id: group.id}}"
                     v-for="group in groups"
                     class="group">
            <h2 class="group__name">{{group.id}}</h2>
            <span class="group__info">
                <span class="icon icon--group"></span>
                {{group.users.length}}
            </span>
            <span class="group__info">
                <span class="icon icon--beer"></span>
                {{maxDrinks}}
            </span>
        </router-link>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                groups: this.$store.state.groups
            }
        },
        computed: {
            maxDrinks() {
                const users = this.$store.state.users;
                return Math.max.apply(null, Object.values(users).map(({drinks}) => drinks))
            }
        },
        methods: {
            create() {
                this.$store.dispatch('create');
            }
        }
    }
</script>