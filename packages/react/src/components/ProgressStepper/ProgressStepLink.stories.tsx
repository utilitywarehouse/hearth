import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressStepLink } from './ProgressStepLink';
import { ProgressStepper } from './ProgressStepper';

const meta: Meta<typeof ProgressStepLink> = {
  title: 'Components / ProgressStepper / ProgressStepLink',
  component: ProgressStepLink,
  argTypes: {
    status: {
      options: ['complete', 'active', 'incomplete'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressStepLink>;

export const Playground: Story = {
  args: {
    status: 'active',
    href: '#payment-data',
    label: 'Payment data',
  },
  render: args => (
    <ProgressStepper>
      <ProgressStepLink status="complete" href="#customer-data" label="Customer data" />
      <ProgressStepLink status="complete" href="#shipping-data" label="Shipping data" />
      <ProgressStepLink {...args} />
      <ProgressStepLink status="incomplete" label="Summary" />
    </ProgressStepper>
  ),
};
