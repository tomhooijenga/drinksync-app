<style>
    .group {
        box-shadow: 0px 7px 7px -5px rgba(0, 0, 0, .4) inset;
        padding: 1rem 10vw
    }

    .group--header {
        box-shadow: none;
    }

    .group__name {
        font-weight: normal;
    }

    .group__info {
        font-size: 18px;
    }
</style>

<template>
    <section :class="classes"
             v-if="group">
        <h2 class="group__name">{{group.id}}</h2>
        <span class="group__info">
            <span class="icon icon--group"></span>
            {{group.data().users.length}}
        </span>
        <span class="group__info">
            <span class="icon icon--beer"></span>
            {{group.data().drinks}}
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
        }
    }
</script>