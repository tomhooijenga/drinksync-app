<style>
    .modal__drink {
        background: #4e54c8;
        padding: 1rem;
    }

    .input__group + .input__group {
        margin-top: 2rem;
    }

    .input__group--buttons {
        display: flex;
        justify-content: space-between;
    }

    .input__label {
        display: block;
        margin-bottom: 1rem;
    }

    .input__optional {
        color: rgba(255, 255, 255, 0.2)
    }
</style>

<template>
    <section class="modal__drink">
        <div class="input__group">
            <label class="input__label"
                   for="category">
                Category
            </label>
            <select class="input"
                    id="category"
                    v-model="drink.category">
                <option v-for="category in categories"
                        :value="category"
                        :key="category.name">
                    {{category.name}}
                </option>
            </select>
        </div>

        <div class="input__group">
            <label class="input__label"
                   for="name">
                Name
                <small class="input__optional">optional</small>
            </label>
            <input type="text"
                   class="input"
                   id="name"
                   v-model="drink.name"/>
        </div>

        <div class="input__group">
            <label class="input__label"
                   for="volume">
                Volume
                <small class="input__optional">ml</small>
            </label>
            <input type="number"
                   class="input"
                   id="volume"
                   v-model="drink.volume"/>
        </div>
        <div class="input__group">
            <label class="input__label"
                   for="percentage">
                Percentage
                <small class="input__optional">&percnt;</small>
            </label>
            <input type="number"
                   class="input"
                   id="percentage"
                   v-model="drink.percentage"/>
        </div>
        <div class="input__group input__group--buttons"
             v-if="mode === 'edit'">
            <button @click="remove"
                    class="button button--outline-danger">
                Delete
            </button>

            <button @click="close"
                    class="button button--primary">
                Done
            </button>
        </div>
        <div class="input__group input__group--buttons"
             v-if="mode === 'add'">
            <button @click="close"
                    class="button button--outline">
                Close
            </button>

            <button @click="add"
                    class="button button--primary">
                Add
            </button>
        </div>
    </section>
</template>

<script>
import { categories, defaultDrinks } from '../lib/drinks'

export default {
  props: {
    drink: {
      type: Object,
      default () {
        return {
          ...defaultDrinks[0],
          name: ''
        }
      }
    },
    mode: {
      type: String,
      default: 'edit'
    }
  },
  data () {
    return {
      categories
    }
  },
  methods: {
    remove () {
      this.$store.commit('drink.remove', this.drink)
      this.close()
    },
    add () {
      this.drink.volume = this.drink.volume || 0
      this.drink.percentage = this.drink.percentage || 0

      this.$store.commit('drink.add', this.drink)
      this.close()
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
