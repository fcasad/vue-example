<template>
	<div v-if="user">
		<h3>Edit User</h3>
		<form @submit.prevent="onSubmit">
			<app-input-field name="user-lname" labelText="Last Name" v-model="form.lastName">
			</app-input-field>
			<app-input-field name="user-fname" labelText="First Name" v-model="form.firstName">
			</app-input-field>
			<app-select-field name="user-team" labelText="Team" :options="teamOptions" v-model="form.teamId">
			</app-select-field>
			<app-input-field name="user-title" labelText="Title" v-model="form.title">
			</app-input-field>
			<app-input-field name="user-email" labelText="Email Address" v-model="form.email" :inputProps="{ type: 'email' }">
			</app-input-field>
			<button 
				type="button" 
				class="btn btn-danger" 
				@click="form = getDefaultData()"
			>
				Clear
			</button>
			<button type="button" class="btn" @click="form = getUserData(user)">Reset</button>
			<button type="submit" class="btn btn-success">Submit</button>
		</form>

		<router-link 
			:to="{ name : 'userDetailRoute', params: { id: user.id } }"
			tag="button"
			class="btn btn-warning"
		>
			back to user
		</router-link>
	</div>
</template>

<script>
	import _ from 'lodash';

	import InputField from '../components/presentational/InputField.vue';
	import SelectField from '../components/presentational/SelectField.vue';

	export default {
		components: {
			'app-input-field': InputField,
			'app-select-field': SelectField,
		},
		data() {
			return {
				form: this.getDefaultData(),
			};
		},
		computed: {
			user() {
				return this.$store.getters.currentUser;
			},
			teamOptions() {
				return this.$store.getters.teams
					.map(team => ({ label: team.name, value: team.id }));
			}
		},
		methods: {
			loadData() {
				this.$store.dispatch('readUser', { id: this.$route.params.id });
				this.$store.dispatch('readTeams');
			},
			getDefaultData() {
				return Object.assign({}, {
					lastName: '',
					firstName: '',
					teamId: '',
					title: '',
					email: '',
				});
			},
			getUserData(user) {
				if (!user) {
					return this.getDefaultData();
				}
				return {
					lastName: user.lastName,
					firstName: user.firstName,
					teamId: user.team.id,
					title: user.title,
					email: user.email,
				};
			},
			formIsPristine() {
				const formData = Object.assign({}, this.form);
				const previousData = this.getUserData(this.user);
				return _.isEqual(formData, previousData);
			},
			goToUserIndex() {
				this.$router.push({ name: 'userIndexRoute' });
			},
			onSubmit() {
				if (this.formIsPristine()) {
					return this.goToUserIndex();
				}
				const id = this.user.id;
				const update = this.form;
				this.$store.dispatch('updateUser', { id, update })
					.then(this.goToUserIndex);
			},
		},
		watch: {
			user(user) {
				this.form = this.getUserData(user);
			},
		},
		beforeRouteEnter (to, from, next) {
			next(vm => vm.loadData());
		},
		beforeRouteLeave (to, from, next) {
			if (this.formIsPristine()) {
				return next();
			}
			if (confirm('Leaving this page will reset unsaved changes!')) {
				next();
			} else {
				next(false);
			}
		},
	}
</script>