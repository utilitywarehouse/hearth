import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ProgressStepper,
  ProgressStep,
  ProgressStepContent,
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
        <ProgressStep status="complete">
          <ProgressStepLink label="Customer Data" href="#customer-data" />
        </ProgressStep>
        <ProgressStep status="complete">
          <ProgressStepLink label="Shipping Data" href="#shipping-data" />
        </ProgressStep>
        <ProgressStep status="active">
          <ProgressStepLink label="Payment Data" href="#payment-data" />
        </ProgressStep>
        <ProgressStep status="incomplete">
          <ProgressStepLink label="Summary" href="#summary" />
        </ProgressStep>
      </ProgressStepper>
    );
  },
};

export const WithStaticLabels: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStep status="complete">
          <ProgressStepContent label="Step 1" />
        </ProgressStep>
        <ProgressStep status="complete">
          <ProgressStepContent label="Step 2" />
        </ProgressStep>
        <ProgressStep status="complete">
          <ProgressStepContent label="Step 3" />
        </ProgressStep>
        <ProgressStep status="complete">
          <ProgressStepContent label="Step 4" />
        </ProgressStep>
      </ProgressStepper>
    );
  },
};

export const AllComplete: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStep status="complete">
          <ProgressStepContent label="Step 1" />
        </ProgressStep>
        <ProgressStep status="complete">
          <ProgressStepContent label="Step 2" />
        </ProgressStep>
        <ProgressStep status="complete">
          <ProgressStepContent label="Step 3" />
        </ProgressStep>
        <ProgressStep status="complete">
          <ProgressStepContent label="Step 4" />
        </ProgressStep>
      </ProgressStepper>
    );
  },
};

export const WithoutLabels: Story = {
  render: () => {
    return (
      <ProgressStepper hideLabels>
        <ProgressStep status="complete">
          <ProgressStepContent label="Customer Data" />
        </ProgressStep>
        <ProgressStep status="complete">
          <ProgressStepContent label="Shipping Data" />
        </ProgressStep>
        <ProgressStep status="active">
          <ProgressStepContent label="Payment Data" />
        </ProgressStep>
        <ProgressStep status="incomplete">
          <ProgressStepContent label="Summary" />
        </ProgressStep>
      </ProgressStepper>
    );
  },
  parameters: {
    controls: { exclude: ['hideLabels'] },
    docs: {
      description: {
        story: 'Set `hideLabels={true}` to hide step labels.',
      },
    },
  },
};

export const WithLinks: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStep status="complete">
          <ProgressStepLink label="Customer Data" href="#customer-data" />
        </ProgressStep>
        <ProgressStep status="complete">
          <ProgressStepLink label="Shipping Data" href="#shipping-data" />
        </ProgressStep>
        <ProgressStep status="active">
          <ProgressStepLink label="Payment Data" href="#payment-data" />
        </ProgressStep>
        <ProgressStep status="incomplete">
          <ProgressStepLink label="Summary" />
        </ProgressStep>
      </ProgressStepper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `ProgressStepLink` for clickable steps and `ProgressStepContent` for non-interactive steps.',
      },
    },
  },
};

export const WithButtons: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStep status="complete">
          <ProgressStepButton
            label="Customer Data"
            onClick={() => console.log('Go to Customer Data')}
          />
        </ProgressStep>
        <ProgressStep status="complete">
          <ProgressStepButton
            label="Shipping Data"
            onClick={() => console.log('Go to Shipping Data')}
          />
        </ProgressStep>
        <ProgressStep status="active">
          <ProgressStepButton label="Payment Data" />
        </ProgressStep>
        <ProgressStep status="incomplete">
          <ProgressStepButton label="Summary" />
        </ProgressStep>
      </ProgressStepper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `ProgressStepButton` for steps that trigger actions instead of navigation.',
      },
    },
  },
};
