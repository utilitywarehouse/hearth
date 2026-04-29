import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ProgressStepper,
  ProgressStep,
  ProgressStepLink,
  ProgressStepButton,
  Flex,
  BodyText,
  Button,
} from '@utilitywarehouse/hearth-react';
import React from 'react';

const meta: Meta<typeof ProgressStepper> = {
  title: 'Components / ProgressStepper',
  component: ProgressStepper,
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

export const KitchenSink: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: args => {
    return (
      <Flex direction="column" gap="400">
        <ProgressStepper {...args}>
          <ProgressStep status="complete" label="Customer data" />
          <ProgressStep status="complete" label="Shipping data" />
          <ProgressStep status="active" label="Payment data" />
          <ProgressStep status="incomplete" label="Summary" />
        </ProgressStepper>
        <ProgressStepper {...args}>
          <ProgressStepLink status="complete" href="#customer-data" label="Customer data" />
          <ProgressStepLink status="complete" href="#shipping-data" label="Shipping data" />
          <ProgressStepLink status="active" href="#payment-data" label="Payment data" />
          <ProgressStepLink status="incomplete" label="Summary" />
        </ProgressStepper>
        <ProgressStepper {...args}>
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
          <ProgressStepButton status="active" label="Payment data" />
          <ProgressStepButton status="incomplete" label="Summary" />
        </ProgressStepper>
      </Flex>
    );
  },
};

export const Playground: Story = {
  render: args => {
    const [currentStep, setCurrentStep] = React.useState(1);

    const getStatus = (step: number) => {
      if (step === currentStep) return 'active';
      if (step < currentStep) return 'complete';
      return 'incomplete';
    };

    return (
      <Flex direction="column" gap="400">
        <BodyText weight="bold">Step {currentStep + 1} Content</BodyText>
        <ProgressStepper {...args}>
          <ProgressStep status={getStatus(0)} label="Customer data" />
          <ProgressStep status={getStatus(1)} label="Shipping data" />
          <ProgressStep status={getStatus(2)} label="Payment data" />
          <ProgressStep status={getStatus(3)} label="Summary" />
        </ProgressStepper>
        <Flex gap="200">
          <Button
            disabled={currentStep === 0}
            onClick={() => {
              if (currentStep > 0) setCurrentStep(s => s - 1);
            }}
          >
            Prev
          </Button>
          <Button
            disabled={currentStep === 3}
            onClick={() => {
              if (currentStep < 3) setCurrentStep(s => s + 1);
            }}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    );
  },
};

export const StaticSteps: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStep status="complete" label="Customer data" />
        <ProgressStep status="complete" label="Shipping data" />
        <ProgressStep status="active" label="Payment data" />
        <ProgressStep status="incomplete" label="Summary" />
      </ProgressStepper>
    );
  },
};

export const LinkSteps: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStepLink status="complete" href="#customer-data" label="Customer data" />
        <ProgressStepLink status="complete" href="#shipping-data" label="Shipping data" />
        <ProgressStepLink status="active" href="#payment-data" label="Payment data" />
        <ProgressStepLink status="incomplete" label="Summary" />
      </ProgressStepper>
    );
  },
};

export const ButtonSteps: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
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
        <ProgressStepButton status="active" label="Payment data" />
        <ProgressStepButton status="incomplete" label="Summary" />
      </ProgressStepper>
    );
  },
};

export const DisabledSteps: Story = {
  render: args => {
    return (
      <Flex direction="column" gap="400">
        <ProgressStepper {...args}>
          <ProgressStepLink
            disabled
            status="complete"
            href="#customer-data"
            label="Customer data"
          />
          <ProgressStepLink status="active" href="#shipping-data" label="Shipping data" />
          <ProgressStepLink status="incomplete" href="#payment-data" label="Payment data" />
          <ProgressStepLink disabled status="incomplete" label="Summary" />
        </ProgressStepper>
        <ProgressStepper {...args}>
          <ProgressStepButton
            disabled
            status="complete"
            onClick={() => console.log('Go to Customer Data')}
            label="Customer data"
          />
          <ProgressStepButton
            status="active"
            onClick={() => console.log('Go to Shipping Data')}
            label="Shipping data"
          />
          <ProgressStepButton status="incomplete" label="Payment data" />
          <ProgressStepButton disabled status="incomplete" label="Summary" />
        </ProgressStepper>
      </Flex>
    );
  },
};
