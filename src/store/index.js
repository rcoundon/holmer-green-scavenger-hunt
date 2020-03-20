import Vue from 'vue';
import Vuex from 'vuex';
import { state, mutations, actions, getters } from './store.js';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
});
