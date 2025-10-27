import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressStepper, ProgressStep, Flex, Box } from '@utilitywarehouse/hearth-react';

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
    showLabels: {
      control: 'boolean',
      description: 'Whether to show step labels',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Whether complete steps should be interactive (clickable)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    showLabels: true,
    interactive: false,
  },
};

export default meta;
type Story = StoryObj<typeof ProgressStepper>;

export const Playground: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStep id="customer-data" state="complete" label="Customer Data" href="#customer-data" />
        <ProgressStep id="shipping-data" state="complete" label="Shipping Data" href="#shipping-data" />
        <ProgressStep id="payment-data" state="active" label="Payment Data" href="#payment-data" />
        <ProgressStep id="summary" state="incomplete" label="Summary" href="#summary" />
      </ProgressStepper>
    );
  },
};

export const AllComplete: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStep id="step-1" state="complete" label="Step 1" href="#step-1" />
        <ProgressStep id="step-2" state="complete" label="Step 2" href="#step-2" />
        <ProgressStep id="step-3" state="complete" label="Step 3" href="#step-3" />
        <ProgressStep id="step-4" state="complete" label="Step 4" href="#step-4" />
      </ProgressStepper>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    return (
      <ProgressStepper interactive>
        <ProgressStep id="customer-data" state="complete" label="Customer Data" href="#customer-data" />
        <ProgressStep id="shipping-data" state="complete" label="Shipping Data" href="#shipping-data" />
        <ProgressStep id="payment-data" state="active" label="Payment Data" href="#payment-data" />
        <ProgressStep id="summary" state="incomplete" label="Summary" href="#summary" />
      </ProgressStepper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'When `interactive` is true, complete steps become clickable links.',
      },
    },
  },
};

export const WithoutLabels: Story = {
  render: () => {
    return (
      <ProgressStepper showLabels={false}>
        <ProgressStep id="customer-data" state="complete" label="Customer Data" href="#customer-data" />
        <ProgressStep id="shipping-data" state="complete" label="Shipping Data" href="#shipping-data" />
        <ProgressStep id="payment-data" state="active" label="Payment Data" href="#payment-data" />
        <ProgressStep id="summary" state="incomplete" label="Summary" href="#summary" />
      </ProgressStepper>
    );
  },
  parameters: {
    controls: { exclude: ['showLabels'] },
    docs: {
      description: {
        story: 'Set `showLabels={false}` to hide step labels.',
      },
    },
  },
};

export const ManySteps: Story = {
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStep id="step-1" state="complete" label="Step 1 Step 1" href="#step-1" />
        <ProgressStep id="step-2" state="complete" label="Step 2 Step 2" href="#step-2" />
        <ProgressStep id="step-3" state="complete" label="Step 3 Step 3" href="#step-3" />
        <ProgressStep id="step-4" state="complete" label="Step 4 Step 4" href="#step-4" />
        <ProgressStep id="step-5" state="active" label="Step 5 Step 5" href="#step-5" />
        <ProgressStep id="step-6" state="incomplete" label="Step 6 Step 6" href="#step-6" />
        <ProgressStep id="step-7" state="incomplete" label="Step 7 Step 7" href="#step-7" />
        <ProgressStep id="step-8" state="incomplete" label="Step 8 Step 8" href="#step-8" />
      </ProgressStepper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'The component handles multiple steps gracefully.',
      },
    },
  },
};

export const ResponsiveLabels: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <Box>
          <Box marginBottom="200">
            <strong>Wide container (labels visible):</strong>
          </Box>
          <Box width="800px">
            <ProgressStepper>
              <ProgressStep id="customer-data" state="complete" label="Customer Data" href="#customer-data" />
              <ProgressStep id="shipping-data" state="complete" label="Shipping Data" href="#shipping-data" />
              <ProgressStep id="payment-data" state="active" label="Payment Data" href="#payment-data" />
              <ProgressStep id="summary" state="incomplete" label="Summary" href="#summary" />
            </ProgressStepper>
          </Box>
        </Box>
        <Box>
          <Box marginBottom="200">
            <strong>Narrow container (labels hidden automatically):</strong>
          </Box>
          <Box width="400px">
            <ProgressStepper>
              <ProgressStep id="customer-data" state="complete" label="Customer Data" href="#customer-data" />
              <ProgressStep id="shipping-data" state="complete" label="Shipping Data" href="#shipping-data" />
              <ProgressStep id="payment-data" state="active" label="Payment Data" href="#payment-data" />
              <ProgressStep id="summary" state="incomplete" label="Summary" href="#summary" />
            </ProgressStepper>
          </Box>
        </Box>
      </Flex>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Labels automatically hide when the container is too narrow (< 600px) to prevent overflow.',
      },
    },
  },
};
