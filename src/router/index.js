import Vue from 'vue';
import VueRouter from 'vue-router';
import TrailHuntView from '../views/TrailHuntView';
import CardHuntView from '../views/CardHuntView';
import Delivery from '../views/Delivery';

Vue.use(VueRouter);

const routes = [
  {
    path: '/trail',
    name: 'Home',
    component: TrailHuntView
  },
  {
    path: '/cardHunt',
    name: 'cardHunt',
    component: CardHuntView
  },
  {
    path: '/',
    name: 'delivery',
    alias: '/delivery',
    component: Delivery
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
