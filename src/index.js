import Vue from 'vue'
import App from './components/App'
import router from './router'
import store from './store'

new Vue({
    el: '#app',
    store,
    router,
    render(h) {
        return h(App)
    }
});