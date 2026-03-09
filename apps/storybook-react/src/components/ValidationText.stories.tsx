import type { Meta, StoryObj } from '@storybook/react-vite';
import { ValidationText } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof ValidationText> = {
  title: 'Stories / ValidationText',
  component: ValidationText,
  argTypes: {
    children: { control: { type: 'text' } },
    status: { control: { type: 'radio' }, options: ['valid', 'invalid'] },
    disableUserSelect: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Hearth validation text',
    status: 'valid',
  },
};

export default meta;
type Story = StoryObj<typeof ValidationText>;

export const Playground: Story = {};
