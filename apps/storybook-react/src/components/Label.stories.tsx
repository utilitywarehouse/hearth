import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Label> = {
  title: 'Stories / Label',
  tags: ['!test'],
  component: Label,
  argTypes: {
    children: { control: { type: 'text' } },
    fontWeight: { control: { type: 'radio' }, options: ['regular', 'semibold'] },
    variant: { control: { type: 'radio' }, options: ['body', 'heading'] },
    disabled: { control: { type: 'boolean' } },
    disableUserSelect: { control: { type: 'boolean' } },
    as: { control: { type: 'radio' }, options: ['label', 'span'] },
  },
  args: {
    children: 'Label',
    disabled: false,
    disableUserSelect: false,
    marginTop: '300',
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Playground: Story = {};
