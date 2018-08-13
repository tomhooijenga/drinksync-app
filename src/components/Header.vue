<style>
    @import "../styles/Button.css";
    @import "../styles/Input.css";

    .header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }

    .banner {
        display: flex;
        padding: 0 10vw
    }

    .banner__input {
        margin-right: 1rem;
    }

    .banner__count {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 100%;
        display: inline-block;
        line-height: 42px;
        font-size: 1.25rem;
        height: 42px;
        width: 42px;
        text-align: center;
        color: white;
    }

    .buttons {
        padding: 10vh 10vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }

    .button--header {
        margin: auto;
    }
</style>

<template>
    <section class="header">

        <section class="buttons">
            <button class="button button--header button--primary button--large" v-on:click="drink(1)">
                Drink!
            </button>
            <button class="button button--header button--link" v-on:click="drink(-1)">
                Remove
            </button>
        </section>
        <section class="banner">
            <input class="banner__input input" type="text" v-model="name"/>
            <span class="banner__count">{{drinks}}</span>
        </section>
    </section>
</template>

<script>
    export default {
        computed: {
            drinks() {
                return this.$store.state.user.drinks;
            },
            name: {
                get() {
                    return this.$store.state.user.name
                },
                set(value) {
                    this.$store.dispatch('name', value)
                }
            }
        },
        methods: {
            drink(amount) {
                this.$store.dispatch('drink', this.$store.state.user.drinks + amount);
            }
        }
    }
</script>