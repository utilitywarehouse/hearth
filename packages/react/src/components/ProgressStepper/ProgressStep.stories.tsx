import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressStep } from './ProgressStep';
import { ProgressStepper } from './ProgressStepper';

const meta: Meta<typeof ProgressStep> = {
  title: 'Components / ProgressStepper / ProgressStep',
  component: ProgressStep,
  argTypes: {
    status: {
      options: ['complete', 'active', 'incomplete'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressStep>;

export const Playground: Story = {
  args: {
    status: 'active',
    label: 'Payment data',
  },
  render: args => (
    <ProgressStepper>
      <ProgressStep status="complete" label="Customer data" />
      <ProgressStep status="complete" label="Shipping data" />
      <ProgressStep {...args} />
      <ProgressStep status="incomplete" label="Summary" />
    </ProgressStepper>
  ),
};
