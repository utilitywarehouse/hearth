import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Label> = {
  title: 'Stories / Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: '`Label` is used for labelling form elements, such as inputs.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    disableUserSelect: { control: { type: 'boolean' } },
    as: { control: { type: 'radio' }, options: ['label', 'span'] },
  },
  args: {
    children: 'Hearth Label',
    disabled: false,
    disableUserSelect: false,
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Playground: Story = {};
