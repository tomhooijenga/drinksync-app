import Vue from "vue";
import VueRouter from "vue-router";
import Overview from '../components/Overview'
import Group from '../components/Group'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Overview
        },
        {
            path: '/:id',
            name: 'group',
            component: Group,
            props: true
        }
    ]
});