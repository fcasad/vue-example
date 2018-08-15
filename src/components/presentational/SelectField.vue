<template>
    <div class="form-group">
        <label for="name" v-if="labelText" v-bind="labelProps">{{ labelText }}</label>
        <select 
            class="form-control" 
            id="name" 
            :value="value"
			@input="$emit('input', $event.target.value)"
        >
            <option 
                v-for="option in options" 
                :key="option.value" 
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script>
    import { isOptionsArray } from '../../utils/validators';

	export default {
		props: {
			name: String,
			labelText: String,
			value: {
				type: String,
				required: true,
            },
            options: {
                type: Array,
                validator: isOptionsArray,
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
					return {};
				}
			},
		}
	};
</script>