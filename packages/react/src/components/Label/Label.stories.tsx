import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Typography / Label',
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
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    interactions: { disable: true },
  },
};
