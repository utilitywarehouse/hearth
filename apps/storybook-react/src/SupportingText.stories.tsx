import type { Meta, StoryObj } from '@storybook/react';
import { SupportingText } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof SupportingText> = {
  title: 'Stories / SupportingText',
  component: SupportingText,
  parameters: {
    docs: {
      description: {
        component:
          '`SupportingText` should be used with form field components to display supporting text.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    disableUserSelect: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Hearth supporting text',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SupportingText>;

export const Playground: Story = {};
