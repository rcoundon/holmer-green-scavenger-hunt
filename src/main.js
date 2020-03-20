import Vue from 'vue';
import App from './App.vue';
import VueScrollTo from 'vue-scrollto';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import store from '@/store';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faTreasureChest,
  faExclamationTriangle,
  faCheckCircle
} from '@fortawesome/pro-solid-svg-icons';

library.add([faTreasureChest, faExclamationTriangle, faCheckCircle]);

Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas'
});
Vue.use(VueScrollTo);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
