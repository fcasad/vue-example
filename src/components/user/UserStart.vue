<template>
    <div>
        <p>Select a User</p>
        <hr>
        <ul class="list-group">
            <router-link v-for="user in users"
            	:to="{ name: 'userDetailRoute', params: { id: user.id } }"
            	tag="li" 
            	class="list-group-item" 
            	style="cursor: pointer"
            >
                {{ user.lastName + ', ' + user.firstName }}
        	</router-link>
        </ul>
    </div>
</template>

<script>
	export default {
        computed: {
            users() {
                return this.$store.getters.users;
            },
        },
        methods: {
            loadData() {
                this.$store.dispatch('readUsers');
            },
        },
        beforeRouteEnter (to, from, next) {
            next(vm => vm.loadData());
        },
	}
</script>