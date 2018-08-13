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
            id: [Number, String],
            classes: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            group() {
                return this.$store.state.groups[this.$props.id]
            },
            drinks() {
                return this.group.users.reduce((value, id) => {
                    return value + this.$store.state.users[id].drinks;
                }, 0);
            }
        }
    }
</script>