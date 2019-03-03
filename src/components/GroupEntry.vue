<style>
    @import '../styles/Group.css';

    .page-header__nav {
        display: flex;
        flex-direction: row;
        padding: 1rem 0 2rem 0;
    }

    .page-header__back {
        font-size: 2em;
        display: flex;
        align-items: center;
        color: white;
        text-decoration: none;
        line-height: 1.5;
    }

    .page-header__scroller {
        flex: 1;
        overflow: hidden;
        padding: 0 1rem;
    }

    .page-header__scroller:first-child {
        padding-left: 0;
    }

    .page-header__scroller:last-child {
        padding-right: 0;
    }

    .page-header__heading {
        font-weight: normal;
        white-space: nowrap;
        overflow-x: auto;
        margin: 0;
        line-height: 1.5;
    }
</style>

<template>
    <section class="group group--header" v-if="group">
        <header class="page-header">
            <div class="page-header__nav">
                <router-link :to="{name: 'index'}"
                             class="page-header__back">
                    <span class="icon icon--arrow-back"></span>
                </router-link>

                <div class="page-header__scroller">
                    <h1 class="page-header__heading">{{group.name}}</h1>
                </div>

                <button type="button" class="button button--outline button--small button--header"
                        v-if="canShare"
                        v-on:click="share">
                    <span class="icon icon--share"></span>
                </button>
            </div>
        </header>

        <span class="group__info">
            <span class="icon icon--people"></span>
            {{group.users.length}}
        </span>
        <span class="group__info">
            <span class="icon icon--beer-large"></span>
            {{drinks.toFixed(2)}}
        </span>
    </section>
</template>

<script>
import { shareGroup } from '../lib/share'

export default {
  data () {
    return {
      canShare: navigator.share !== undefined
    }
  },
  props: {
    group: Object,
    classes: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    drinks () {
      return this.group.users
        .reduce((total, user) => {
          return total + user.drinks
        }, 0)
    }
  },
  methods: {
    share () {
      shareGroup(this.group)
    }
  }
}
</script>
