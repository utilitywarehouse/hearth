import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ProgressStepper,
  ProgressStep,
  ProgressStepLink,
  ProgressStepButton,
  Flex,
  BodyText,
  Button,
  Box,
} from '@utilitywarehouse/hearth-react';
import React from 'react';

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
    const [currentStep, setCurrentStep] = React.useState(0);

    const getStatus = (step: number) => {
      if (step === currentStep) return 'active';
      if (step < currentStep) return 'complete';
      return 'incomplete';
    };

    return (
      <Flex direction="column" gap="400">
        <Box paddingBlock="400">
          <BodyText weight="bold">Step {currentStep + 1} Content</BodyText>
        </Box>
        <ProgressStepper {...args}>
          <ProgressStepButton status={getStatus(0)} onClick={() => setCurrentStep(0)}>
            Customer data
          </ProgressStepButton>
          <ProgressStepButton status={getStatus(1)} onClick={() => setCurrentStep(1)}>
            Shipping data
          </ProgressStepButton>
          <ProgressStepButton status={getStatus(2)} onClick={() => setCurrentStep(2)}>
            Payment data
          </ProgressStepButton>
          <ProgressStepButton status={getStatus(3)} onClick={() => setCurrentStep(3)}>
            Summary
          </ProgressStepButton>
        </ProgressStepper>
        <Flex gap="200">
          <Button
            disabled={currentStep === 0}
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep(s => s - 1);
              }
            }}
          >
            Prev
          </Button>
          <Button
            disabled={currentStep === 3}
            onClick={() => {
              if (currentStep < 3) {
                setCurrentStep(s => s + 1);
              }
            }}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    );
  },
};

export const KitchenSink: Story = {
  render: args => {
    return (
      <Flex direction="column" gap="400">
        <ProgressStepper {...args}>
          <ProgressStep status="complete">Customer data</ProgressStep>
          <ProgressStep status="complete">Shipping data</ProgressStep>
          <ProgressStep status="active">Payment data</ProgressStep>
          <ProgressStep status="incomplete">Summary</ProgressStep>
        </ProgressStepper>
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
      </Flex>
    );
  },
};

export const StaticSteps: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStep status="complete">Customer data</ProgressStep>
        <ProgressStep status="complete">Shipping data</ProgressStep>
        <ProgressStep status="active">Payment data</ProgressStep>
        <ProgressStep status="incomplete">Summary</ProgressStep>
      </ProgressStepper>
    );
  },
};

export const LinkSteps: Story = {
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

export const ButtonSteps: Story = {
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

export const DisabledSteps: Story = {
  render: args => {
    return (
      <Flex direction="column" gap="400">
        <ProgressStepper {...args}>
          <ProgressStepLink disabled status="complete" href="#customer-data">
            Customer data
          </ProgressStepLink>
          <ProgressStepLink status="active" href="#shipping-data">
            Shipping data
          </ProgressStepLink>
          <ProgressStepLink status="incomplete" href="#payment-data">
            Payment data
          </ProgressStepLink>
          <ProgressStepLink disabled status="incomplete">
            Summary
          </ProgressStepLink>
        </ProgressStepper>
        <ProgressStepper {...args}>
          <ProgressStepButton
            disabled
            status="complete"
            onClick={() => console.log('Go to Customer Data')}
          >
            Customer data
          </ProgressStepButton>
          <ProgressStepButton status="active" onClick={() => console.log('Go to Shipping Data')}>
            Shipping data
          </ProgressStepButton>
          <ProgressStepButton status="incomplete">Payment data</ProgressStepButton>
          <ProgressStepButton disabled status="incomplete">
            Summary
          </ProgressStepButton>
        </ProgressStepper>
      </Flex>
    );
  },
};
