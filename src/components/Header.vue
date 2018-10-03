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

    .banner__stats {
        background: rgba(255, 255, 255, 0.2);
        border-radius: .3rem;
        display: inline-block;
        line-height: 42px;
        font-size: 1.25rem;
        height: 42px;
        padding: 0 0.5rem;
        margin-left: 1rem;
        text-align: center;
        color: white;
    }

    .banner__stats__item {
        display: inline-block;
        height: 100%;
    }

    .banner__stats__item + .banner__stats__item {
        padding-left: 0.5rem;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
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
            <button class="button button--header button--primary button--large"
                    v-on:click="drink(1)"
                    v-on:mousedown="binge(1)"
                    v-on:mouseup="stopBinge"
                    v-on:mouseleave="stopBinge"
                    v-on:contextmenu.prevent>
                Drink!
            </button>
            <button class="button button--header button--link"
                    v-on:click="drink(-1)"
                    v-on:mousedown="binge(-1)"
                    v-on:mouseup="stopBinge"
                    v-on:mouseleave="stopBinge"
                    v-on:contextmenu.prevent>
                Remove
            </button>
        </section>
        <section class="banner">
            <input class="banner__input input" type="text" v-model="name"/>
            <span class="banner__stats">
                <span class="banner__stats__item">{{drinks}}</span>
                <span class="banner__stats__item">{{permille.toFixed(2)}} &permil;</span>
            </span>
        </section>
    </section>
</template>

<script>
    export default {
        computed: {
            drinks() {
                return this.$store.state.user.drinks;
            },
            permille() {
                return this.$store.state.user.permille;
            },
            name: {
                get() {
                    console.log(this.$store.state.user);
                    return this.$store.state.user.name
                },
                set(value) {
                    this.$store.dispatch('name', value)
                }
            }
        },
        methods: {
            drink(amount) {
                this.$store.dispatch('drink', amount);
            },
            binge(amount) {
                this.intervalId = setInterval(() => {
                    this.drink(amount)
                }, 200)
            },
            stopBinge() {
                window.clearInterval(this.intervalId);
            }
        }
    }
</script>