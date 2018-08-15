<template>
	<div class="form-group">
		<label for="name" v-if="labelText" v-bind="labelProps">{{ labelText }}</label>
		<input
			class="form-control"
			id="name"
			:value="value"
			@input="$emit('input', $event.target.value)"
			v-bind="inputProps"
		>
	</div>
</template>

<script>
	export default {
		props: {
			name: String,
			labelText: String,
			value: {
				type: String,
				required: true,
			},
			labelProps: {
				type: Object,
				default() {
					return {};
				}
			},
			inputProps: {
				type: Object,
				default() {
					return {
						type: 'text',
					};
				}
			},
		}
	};
</script>