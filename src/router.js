import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue';
import User from './components/user/User.vue';
import UserStart from './components/user/UserStart.vue';
import UserDetail from './components/user/UserDetail.vue';
import UserEdit from './components/user/UserEdit.vue';
import NotFound from './components/NotFound.vue';

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