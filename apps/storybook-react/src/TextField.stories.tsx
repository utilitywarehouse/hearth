import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof TextField> = {
  title: 'Stories / TextField',
  component: TextField,
  parameters: {
    docs: {
      description: {
        component: '`Textfield`',
      },
    },
  },
  argTypes: {
    placeholder: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
  },
  args: {
    placeholder: 'Placeholder',
    disabled: false,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Playground: Story = {};
