import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar, Flex } from '@utilitywarehouse/hearth-react';
import React from 'react';

const meta: Meta<typeof ProgressBar> = {
  title: 'Stories / ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component:
          '`ProgressBar` displays the progress of a task or process in a linear bar format, with support for different visual states.',
      },
    },
  },
  argTypes: {
    colorScheme: { control: { type: 'radio' }, options: ['default', 'success', 'danger'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: {
    colorScheme: 'default',
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Playground: Story = {
  render: args => {
    const [value, setValue] = React.useState(20);

    // Simulate changes
    React.useEffect(() => {
      const interval = setInterval(() => {
        setValue(current => Math.min(100, Math.round(current + Math.random() * 25)));
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return (
      <Flex direction="column" gap="400" width="600px">
        <ProgressBar {...args} variant="linear" value={args.value || value} />
        <Flex gap="400">
          <ProgressBar {...args} variant="circular" value={args.value || value} size="md" />
          <ProgressBar {...args} variant="circular" value={args.value || value} size="sm" />
        </Flex>
      </Flex>
    );
  },
};

export const ColorSchemes: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <ProgressBar variant="linear" label="Upload progress" value={90} />
        <ProgressBar variant="linear" label="Completed tasks" colorScheme="success" value={100} />
        <ProgressBar variant="linear" label="Storage usage" colorScheme="danger" value={10} />
        <ProgressBar variant="circular" label="Upload progress" value={90} />
        <ProgressBar variant="circular" label="Completed tasks" colorScheme="success" value={100} />
        <ProgressBar variant="circular" label="Storage usage" colorScheme="danger" value={10} />
      </Flex>
    );
  },
};

export const FormatValue: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <ProgressBar
          variant="linear"
          label="Storage usage"
          value={87}
          formatValue={(value: number) => `${value / 10}GB / 10GB`}
        />

        <ProgressBar
          variant="circular"
          label="files"
          value={15}
          max={50}
          formatValue={(value: number) => `${value}/50`}
        />
      </Flex>
    );
  },
};

export const HideLabel: Story = {
  render: () => {
    return <ProgressBar label="Hidden label" value={60} hideLabel />;
  },
};
