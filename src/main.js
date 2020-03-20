import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faTreasureChest } from '@fortawesome/pro-solid-svg-icons';

library.add([faTreasureChest]);

Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas'
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
