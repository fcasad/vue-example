import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import App from './App.vue'
import router from './router'
import store from './store'

const unsync = sync(store, router);

new Vue({
  el: '#app',
  router,
  store,
  render(createEl) {
  	return createEl(App);
  },
  destroyed() {
  	unsync();
  },
});

