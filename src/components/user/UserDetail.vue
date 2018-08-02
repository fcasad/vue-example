<template>
	<div v-if="user">
		<h3>{{ user.lastName }}, {{ user.firstName }}</h3>
		<h4>{{ user.team.name }} Team</h4>
		<p>{{ user.title }}</p>
		<p>{{ user.email }}</p>
		<router-link 
			:to="{ name: 'userEditRoute', params: { id: user.id } }" 
			tag="button" 
			class="btn btn-warning"
		>
			Edit
		</router-link>
	</div>
</template>

<script>
	import * as api from '../../api';

	export default {
		computed: {
			user() {
				return this.$store.getters.currentUser;
			},
		},
		methods: {
			loadData() {
				this.$store.dispatch('readUser', { id: this.$route.params.id });
			},
		},
		beforeRouteEnter (to, from, next) {
			next(vm => vm.loadData());
		},
	}
</script>