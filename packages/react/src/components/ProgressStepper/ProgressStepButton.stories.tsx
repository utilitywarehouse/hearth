import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressStepButton } from './ProgressStepButton';
import { ProgressStepper } from './ProgressStepper';

const meta: Meta<typeof ProgressStepButton> = {
  title: 'Components / ProgressStepper / ProgressStepButton',
  component: ProgressStepButton,
  argTypes: {
    status: {
      options: ['complete', 'active', 'incomplete'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressStepButton>;

export const Playground: Story = {
  args: {
    status: 'active',
    label: 'Payment data',
  },
  render: args => (
    <ProgressStepper>
      <ProgressStepButton
        status="complete"
        onClick={() => console.log('Go to Customer Data')}
        label="Customer data"
      />
      <ProgressStepButton
        status="complete"
        onClick={() => console.log('Go to Shipping Data')}
        label="Shipping data"
      />
      <ProgressStepButton {...args} />
      <ProgressStepButton status="incomplete" label="Summary" />
    </ProgressStepper>
  ),
};
