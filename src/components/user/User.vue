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
		// created() {
		// console.log("created user", this.$route)
		// },
		// watch: {
		// 	'$route': (to, from) => console.log("watching user", to),
		// },
		methods: {
			goToHome() {
				this.$router.push({ name: 'indexRoute' })
			} 
		},
	}
</script>