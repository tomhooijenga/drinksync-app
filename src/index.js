import Vue from 'vue'
import App from './components/App'
import router from './lib/router'
import store from './lib/store'
import './lib/pwa';

new Vue({
    el: '#app',
    store,
    router,
    render(h) {
        return h(App)
    }
});