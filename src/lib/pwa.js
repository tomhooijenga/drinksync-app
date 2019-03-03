import { register } from 'register-service-worker'
import store from './store'

register(`${process.env.BASE_URL}service-worker.js`)

const appMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone
if (!appMode) {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault()

    store.state.install.prompt = e
  })
}
