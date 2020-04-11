<style>
    @import '~normalize.css';
    @import '../styles/Icons.css';
    @import '../styles/Button.css';
    @import '../styles/Input.css';

    .app {
        display: flex;
        flex-direction: column;
    }
</style>

<template>
    <main class="app">
        <InstallBanner/>
        <Header/>
        <router-view/>
        <modals-container/>
    </main>
</template>

<script>
import InstallBanner from './InstallBanner'
import Header from './Header'

export default {
  components: {
    InstallBanner,
    Header
  },

  created () {
    this.$store.dispatch('user.join')
  }
}
</script>
