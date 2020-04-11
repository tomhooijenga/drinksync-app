<style>
    @import '../styles/Group.css';

    .overview {
        flex: 1
    }

    .overview__header {
        padding: 0 5vw;
        font-weight: normal;
        display: flex;
    }

    .overview__header__button {
        align-self: flex-end;
        margin-left: auto;
    }
</style>

<template>
    <section class="overview">
        <h1 class="overview__header">
            Groups
            <button type="button"
                    class="button overview__header__button button--outline button--small"
                    v-on:click="create">
                <span class="icon icon--add"></span>
            </button>
        </h1>

        <router-link tag="div"
                     :key="group.id"
                     :to="{name: 'group', params: {id: group.name}}"
                     v-for="group in groups"
                     class="group">
            <h2 class="group__name">{{group.name}}</h2>
            <span class="group__info">
                <span class="icon icon--people"></span>
                {{group.users.length}}
            </span>
            <span class="group__info">
                <span class="icon icon--beer-large"></span>
                {{drinks(group).toFixed(2)}}
            </span>
        </router-link>
    </section>
</template>

<script>

import { mapState } from 'vuex'

export default {
  created () {
    console.log(this.groups)
  },

  computed: mapState(['groups']),

  methods: {
    create () {
      this.$store.dispatch('group.create')
    },
    drinks (group) {
      return group.users.reduce((total, user) => {
        return total + user.drinks
      }, 0)
    }
  }
}
</script>
