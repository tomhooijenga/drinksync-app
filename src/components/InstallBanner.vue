<style>
    .install-banner {
        padding: 1rem 5vw;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, .4)
    }

    .install-banner__buttons {
        display: flex;
        flex-direction: row;
    }

    .install-banner__buttons .button--primary {
        margin-left: 1rem;
        flex: 1;
    }
</style>

<template>
    <section class="install-banner"
             v-if="show">
        <p>
            Add DrinkSync to your homescreen for easier tracking
        </p>
        <div class="install-banner__buttons">
            <button type="button" class="button button--outline" v-on:click="close">
                Close
            </button>
            <button type="button" class="button button--primary" v-on:click="install">
                Add to homescreen
            </button>
        </div>
    </section>
</template>

<script>
    export default {
        computed: {
            show() {
                return this.$store.state.installPrompt;
            }
        },
        methods: {
            close() {
                this.$store.state.installPrompt = null;
            },
            install() {
                const installPrompt = this.$store.state.installPrompt;

                installPrompt.prompt();
                installPrompt.userChoice.then(() => {
                    this.$store.state.installPrompt = null;
                })
            }
        }
    }
</script>