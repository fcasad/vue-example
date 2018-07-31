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
    import * as api from '../../api';

	export default {
		data() {
			return {
				users: [],
			};
		},
        methods: {
            loadData() {
                api.listUsers()
                    .then(users => { this.users = users; });
            },
        },
        created() {
            this.loadData();
        },
	}
</script>