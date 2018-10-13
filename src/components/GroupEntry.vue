<style>
    .group {
        box-shadow: 0px 7px 7px -5px rgba(0, 0, 0, .4) inset;
        padding: 1rem 5vw
    }

    .group--header {
        box-shadow: none;
    }

    .group__name {
        font-weight: normal;
    }
</style>

<template>
    <section class="group group--header" v-if="group">
        <h1 class="group__name">
            {{group.name}}
        </h1>
        <span class="group__info">
            <span class="icon icon--group"></span>
            {{group.users.length}}
        </span>
        <span class="group__info">
            <span class="icon icon--beer"></span>
            {{drinks}}
        </span>
    </section>
</template>

<script>
    export default {
        props: {
            group: Object,
            classes: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            drinks() {
                return this.group.users
                    .reduce((total, user) => {
                        return total + user.drinks;
                    }, 0);
            }
        }
    }
</script>