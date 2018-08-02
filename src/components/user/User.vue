<template>
	<div>
		<h1>The User Page</h1>
	    <hr>
	    <router-view></router-view>	
	    <button class="btn btn-primary" @click="goToHome">go to home</button>
	</div>
</template>

<script>
	export default {
		methods: {
			goToHome() {
				this.$router.push({ name: 'indexRoute' });
			} 
		},
	}
</script>