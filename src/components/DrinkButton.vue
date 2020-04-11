<style>
    .drink-button {
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        font-size: 1rem;
        border-radius: .25rem;
        transition: color .15s ease-in-out, background-color .1s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        background: white;
        color: #4e54c8;
        text-decoration: none;
        padding: 0.5rem 1rem;
        line-height: 1;
        scroll-snap-align: center;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        width: 8.75rem;
        height: 8.75rem;
        flex-shrink: 0;
    }

    .drink-button:active {
        background: rgba(255,255,255,0.8);
    }

    .drink-button + .drink-button {
        margin-left: 5vw;
    }

    .drink-button__stat {
        border: 0 solid rgba(78, 84, 200, 0.5);
        color: rgba(78, 84, 200, 0.5);
        font-size: 0.8rem;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: flex;
        justify-content: space-evenly;
    }

    .drink-button__stat--top {
        padding-bottom: 0.5rem;
        border-bottom-width: 1px;
    }

    .drink-button__stat--bottom {
        padding-top: 0.5rem;
        border-top-width: 1px;
    }

    .drink-button .icon {
        margin: 1rem 0;
        font-size: 3em;
    }
</style>

<template>
    <button class="drink-button"
            v-on:click="consume(drink)">
        <span class="drink-button__stat drink-button__stat--top"
              v-text="drink.name || drink.category.name">
        </span>
        <span :class="`icon icon--${drink.category.icon}`"></span>
        <span class="drink-button__stat drink-button__stat--bottom">
            <span class="drink-button__stat">{{drink.volume}} ml</span>
            <span class="drink-button__stat">{{drink.percentage}} &percnt;</span>
        </span>
    </button>
</template>

<script>
export default {
  props: {
    drink: Object
  },

  methods: {
    consume ({ volume, percentage }) {
      const units = volume * percentage / 1000
      const drinks = this.$store.state.user.drinks

      this.$store.dispatch('user.update', {
        drinks: drinks + units
      })
    }
  }
}
</script>
