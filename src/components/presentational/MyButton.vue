<template>
    <button :style="styles" @click="$emit('click', $event)">
        <slot></slot>
    </button>
</template>

<script>
    const sizes = {
        xsmall: 1.5,
        small: 2,
        medium: 3.5,
        large: 5,
        xlarge: 8,
    };

    export default {
        props: {
            rounded: {
                type: Boolean,
                default: false,
            },
            size: {
                type: String,
                default: 'medium',
                validator: val => !!sizes[val],
            }
        },
        data() {
            return {
                styles: {
                    borderRadius: this.rounded ? '5px' : '0px',
                    height: sizes[this.size] + 'em' || 'auto',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignContent: 'space-around',
                },
            };
        }
    };
</script>
