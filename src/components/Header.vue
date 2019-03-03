<style>
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
        border: 1px solid rgba(255, 255, 255, 0.2);
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
</style>

<template>
    <section class="header"
             v-if="user">

        <section class="buttons">
            <DrinkButton v-for="drink of drinks"
                         @contextmenu.prevent.native="edit(drink)"
                         :drink="drink"/>
            <button class="drink-button"
                    @click="add"
                    @contextmenu.prevent="add">
                <span class="icon icon--add"></span>
            </button>

        </section>
        <section class="banner">
            <input class="banner__input input" type="text" v-model="name"/>
            <span class="banner__stats">
                <span class="banner__stats__item">{{units.toFixed(2)}}</span>
                <span class="banner__stats__item">{{(ppm / 1000).toFixed(2)}} &permil;</span>
            </span>
        </section>
    </section>
</template>

<script>
import debounce from 'lodash.debounce'
import DrinkButton from './DrinkButton'
import DrinkModal from './DrinkModal'

const modalOptions = {
  adaptive: true,
  height: 'auto',
  width: '80%',
  maxWidth: 600
}

export default {
  components: {
    DrinkButton
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    units () {
      return this.$store.state.user.drinks
    },
    ppm () {
      return this.$store.state.user.ppm
    },
    drinks () {
      return this.$store.state.drinks
    },
    name: {
      get () {
        return this.$store.state.user.name
      },
      set: debounce(function (value) {
        this.$store.dispatch('user.update', {
          name: value
        })
      }, 100)
    }
  },
  methods: {
    edit (drink) {
      this.$modal.show(DrinkModal, {
        drink
      }, modalOptions)
    },
    add () {
      this.$modal.show(DrinkModal, {
        mode: 'add'
      }, modalOptions)
    }
  }
}
</script>
