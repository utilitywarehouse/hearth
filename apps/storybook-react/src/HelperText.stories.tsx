import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelperText } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof HelperText> = {
  title: 'Stories / HelperText',
  component: HelperText,
  parameters: {
    docs: {
      description: {
        component: '`HelperText` should be used with form field components to display helper text.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    disableUserSelect: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Hearth helper text',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof HelperText>;

export const Playground: Story = {};
