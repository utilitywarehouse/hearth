import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ProgressStepper,
  ProgressStep,
  ProgressStepLink,
  ProgressStepButton,
} from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof ProgressStepper> = {
  title: 'Stories / ProgressStepper',
  component: ProgressStepper,
  parameters: {
    docs: {
      description: {
        component:
          'Use the `ProgressStepper` component to show users their progress through a multi-step process.',
      },
    },
  },
  argTypes: {
    hideLabels: {
      control: 'boolean',
      description: 'Whether to hide step labels',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    hideLabels: false,
  },
};

export default meta;
type Story = StoryObj<typeof ProgressStepper>;

export const Playground: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStepLink status="complete" href="#customer-data">
          Customer data
        </ProgressStepLink>
        <ProgressStepLink status="complete" href="#shipping-data">
          Shipping data
        </ProgressStepLink>
        <ProgressStepLink status="active" href="#payment-data">
          Payment data
        </ProgressStepLink>
        <ProgressStepLink status="incomplete" href="#summary">
          Summary
        </ProgressStepLink>
      </ProgressStepper>
    );
  },
};

export const WithStaticLabels: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStep status="complete">Step 1</ProgressStep>
        <ProgressStep status="complete">Step 2</ProgressStep>
        <ProgressStep status="complete">Step 3</ProgressStep>
        <ProgressStep status="complete">Step 4</ProgressStep>
      </ProgressStepper>
    );
  },
};

export const WithLinks: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStepLink status="complete" href="#customer-data">
          Customer data
        </ProgressStepLink>
        <ProgressStepLink status="complete" href="#shipping-data">
          Shipping data
        </ProgressStepLink>
        <ProgressStepLink status="active" href="#payment-data">
          Payment data
        </ProgressStepLink>
        <ProgressStepLink status="incomplete">Summary</ProgressStepLink>
      </ProgressStepper>
    );
  },
};

export const WithButtons: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStepButton status="complete" onClick={() => console.log('Go to Customer Data')}>
          Customer data
        </ProgressStepButton>
        <ProgressStepButton status="complete" onClick={() => console.log('Go to Shipping Data')}>
          Shipping data
        </ProgressStepButton>
        <ProgressStepButton status="active">Payment data</ProgressStepButton>
        <ProgressStepButton status="incomplete">Summary</ProgressStepButton>
      </ProgressStepper>
    );
  },
};
