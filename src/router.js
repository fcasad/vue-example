import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './pages/Home.vue';
import User from './pages/User.vue';
import UserStart from './pages/UserStart.vue';
import UserDetail from './pages/UserDetail.vue';
import UserEdit from './pages/UserEdit.vue';
import NotFound from './pages/NotFound.vue';

Vue.use(VueRouter);

export const routes = [
	{ path: '/', name: 'indexRoute', component: Home },
	{ 
		path: '/user', 
		component: User,
		children: [
			{ path: '', name: 'userIndexRoute', component: UserStart },
			{ path: ':id', name: 'userDetailRoute', component: UserDetail },
			{ path: ':id/edit', name: 'userEditRoute', component: UserEdit },
		],
	},
	{ path: '*', name: 'notFoundRoute', component: NotFound }
];

export default new VueRouter({ mode: 'history', routes });