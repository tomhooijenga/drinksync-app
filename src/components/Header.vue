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
        padding: 0 5vw
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
        padding: 10vh 5vw;
        display: flex;
        justify-content: space-between;
        scroll-snap-type: x mandatory;
        overflow-x: auto;
    }

    .button--drink {
        padding: 2rem;
        font-size: 3rem;
        line-height: 1;
        scroll-snap-align: center;
    }
    .button--drink + .button--drink {
        margin-left: 5vw;
    }
</style>

<template>
    <section class="header"
             v-if="user">

        <section class="buttons">
            <button class="button button--drink"
                    v-on:click="drink(type)"
                    v-on:contextmenu.prevent
                    v-for="type in types">
                <span :class="`icon icon--${type.icon}`"></span>
            </button>
        </section>
        <section class="banner">
            <input class="banner__input input" type="text" v-model="name"/>
            <span class="banner__stats">
                <span class="banner__stats__item">{{drinks.toFixed(2)}}</span>
                <span class="banner__stats__item">{{(ppm / 1000).toFixed(2)}} &permil;</span>
            </span>
        </section>
    </section>
</template>

<script>
    import types from '../lib/drinks'

    export default {
        data() {
            return {
                types
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            drinks() {
                return this.$store.state.user.drinks;
            },
            ppm() {
                return this.$store.state.user.ppm;
            },
            name: {
                get() {
                    return this.$store.state.user.name;
                },
                set(value) {
                    this.$store.dispatch('user.update', {
                        name: value
                    })
                }
            }
        },
        methods: {
            drink({units}) {
                this.$store.dispatch('user.update', {
                    drinks: this.drinks + units
                });
            }
        }
    }
</script>