<template>
	<div v-if="user">
		<h3>Edit User</h3>
		<form @submit.prevent="onSubmit">
			<div class="form-group">
				<label for="user-lname">Last Name</label>
				<input 
					type="text"
					class="form-control"
					id="user-lname"
					v-model="form.lastName"
				>
			</div>
			<div class="form-group">
				<label for="user-fname">First Name</label>
				<input 
					type="text"
					class="form-control"
					id="user-fname"
					v-model="form.firstName"
				>
			</div>
			<div class="form-group">
				<label for="user-team">Team</label>
				<select class="form-control" id="user-team" v-model="form.teamId">
					<option 
						v-for="option in teamOptions" 
						:key="option.value" 
						:value="option.value"
					>
						{{ option.name }}
					</option>
				</select>
			</div>
			<div class="form-group">
				<label for="user-title">Title</label>
				<input 
					type="text"
					class="form-control"
					id="user-title"
					v-model="form.title"
				>
			</div>
			<div class="form-group">
				<label for="user-email">Email address</label>
				<input 
					type="email"
					class="form-control"
					id="user-email"
					v-model="form.email"
				>
			</div>
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

	export default {
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
					.map(team => ({ name: team.name, value: team.id }));
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