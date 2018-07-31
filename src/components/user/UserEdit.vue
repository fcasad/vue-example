<template>
	<div>
		<h3>Edit User</h3>
		<p>lastName: {{ lastName }}</p>
		<p>firstName: {{ firstName }}</p>
		<p>teamName: {{ teamName }}</p>
		<p>title: {{ title }}</p>
		<p>email: {{ email }}</p>
		<router-link 
			:to="{ name : 'userDetailRoute', params: { id } }" 
			tag="button" 
			class="btn btn-warning"
		>
			back to user
		</router-link>
	</div>
</template>

<script>
	import * as api from '../../api';

	export default {
		data() {
			return {
				user: null,
			};
		},
		computed: {
			id() {
				return (this.user && this.user.id) || '';
			},
			firstName() {
				return (this.user && this.user.firstName) || '';
			},
			lastName() {
				return (this.user && this.user.lastName) || '';
			},
			teamName() {
				return (this.user && this.user.team && this.user.team.name) || '';
			},
			title() {
				return (this.user && this.user.title) || '';
			},
			email() {
				return (this.user && this.user.email) || '';
			},
		},
		methods: {
			loadData(route) {
				api.getUser(route.params.id)
					.then(user => { this.user = user });
			},
		},
		created() {
			this.loadData(this.$route);
		},
	}
</script>