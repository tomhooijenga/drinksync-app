<template></template>

<script>
    export default {
        mounted() {
            if (this.$store.state.token) {
                this.join();
            } else {
                this.$store.watch(() => this.$store.state.token, (token, old) => {
                    this.join();
                })
            }
        },
        methods: {
            join() {
                const id = this.$route.params.id;

                this.$store.dispatch('join', id);
                this.$router.replace({
                    name: 'group',
                    params: {
                        id
                    }
                })
            }
        }
    }
</script>