import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user.js';
import team from './modules/team.js';

Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
	modules: { user, team },
});
