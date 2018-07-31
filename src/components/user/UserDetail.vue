<template>
	<div>
		<h3>{{ name }}</h3>
		<h4>{{ teamName }} Team</h4>
		<p>{{ title }}</p>
		<p>{{ email }}</p>
		<router-link 
			:to="{ name: 'userEditRoute', params: { id } }" 
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
		data() {
			return {
				user: null,
			};
		},
		computed: {
			id() {
				return (this.user && this.user.id) || '';
			},
			name() {
				const last = this.user && this.user.lastName;
				const first = this.user && this.user.firstName;
				return (last && first) ? `${last}, ${first}` : '';
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