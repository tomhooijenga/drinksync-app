import { defaultDrinks } from '../drinks'

export default {
  token: '',
  user: {
    id: null,
    name: '',
    drinks: 0,
    ppm: 0
  },
  groups: {},
  users: {},
  drinks: [...defaultDrinks],
  install: {
    prompt: null,
    askAgain: null
  }
}
