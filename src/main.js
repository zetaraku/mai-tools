import Vue from 'vue';
import VueGtag from 'vue-gtag';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';

Vue.config.productionTip = false;

// Enable auto tracking
Vue.use(VueGtag, {
  config: { id: process.env.GA_TRACK_ID },
}, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
