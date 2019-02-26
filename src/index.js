import Vue from 'vue'
import VModal from 'vue-js-modal'
import App from './components/App'
import router from './lib/router'
import store from './lib/store'
import './lib/pwa';

Vue.use(VModal, {
    dynamic: true
});


new Vue({
    el: '#app',
    store,
    router,
    render(h) {
        return h(App)
    }
});