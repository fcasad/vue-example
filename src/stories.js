import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import MyButton from './MyButton.vue';

const sizes = {
    xsmall: 0.5,
    small: 1,
    medium: 2,
    large: 2.5,
    xlarge: 3,
};

const makeComponent = () => {
    return {
        components: { MyButton },
        template: `
            <my-button :rounded="rounded" :size="size" @click="onClick">
                {{ btnText }}
            </my-button>
        `,
        data() {
            return {
                rounded: boolean('rounded', false),
                btnText: text('children', 'Submit'),
                size: select('size', Object.keys(sizes), 'medium'),
            };
        },
        methods: {
            onClick: action('@click'),
        },
    }
};

const notes = 'Simple note describing the MyButton component.  This could also come from a markdown file';

storiesOf('buttons', module)
    .addDecorator(withKnobs)
    .add('MyButton', withNotes(notes)(makeComponent));
