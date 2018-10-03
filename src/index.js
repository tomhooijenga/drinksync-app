import Vue from 'vue'
import "./api/firebase";
import App from './components/App'
import router from './api/router'
import store from './api/store'

new Vue({
    el: '#app',
    store,
    router,
    render(h) {
        return h(App)
    }
});