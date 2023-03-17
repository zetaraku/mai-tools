import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import ScoreCalc from '@/views/ScoreCalc.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/score-calc',
    name: 'score-calc',
    component: ScoreCalc,
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];

export default new VueRouter({
  mode: 'hash',
  routes,
});
