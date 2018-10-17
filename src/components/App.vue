<style>
    @import "~normalize.css";

    .app {
        display: flex;
        flex-direction: column;
    }
</style>

<template>
    <main class="app">
        <Header />
        <router-view></router-view>
    </main>
</template>

<script>
    import Header from "./Header"

    export default {
        components: {
            Header
        },

        created() {
            this.$store.dispatch('user.join');
        },

        computed: {
            connected() {
                console.log(this.$store.state.connected)
                return this.$store.state.connected;
            }
        }
    }
</script>