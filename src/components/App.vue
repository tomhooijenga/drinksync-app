<style>
    @import "~normalize.css";

    body {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        background: #4e54c8;
        background: -webkit-linear-gradient(to bottom right, #8f94fb, #4e54c8);
        background: linear-gradient(to bottom right, #8f94fb, #4e54c8);
        min-height: 100vh;
        color: white;
    }

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

        // mounted() {
        //     this.$store.dispatch('join', 1);
        // }
    }
</script>