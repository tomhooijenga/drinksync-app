import Vue from "vue";
import VueRouter from "vue-router";
import Overview from './components/Overview'
import Group from './components/Group'
import Join from './components/Join'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Overview
        },
        {
            path: '/join/:id',
            name: 'join',
            component: Join
        },
        {
            path: '/:id(\\d+)',
            name: 'group',
            component: Group
        }
    ]
});