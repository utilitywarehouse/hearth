import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar, Flex, BodyText } from '@utilitywarehouse/hearth-react';
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
    return <ProgressBar {...args} value={args.value || value} />;
  },
};

export const AllVariants: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <ProgressBar label="Upload progress" value={90} />
        <ProgressBar label="Completed tasks" colorScheme="success" value={100} />
        <ProgressBar label="Storage usage" colorScheme="danger" value={10} />
      </Flex>
    );
  },
};

export const OptionalContent: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <ProgressBar
          label="Storage usage"
          value={87}
          formatValue={value => `${value / 10}GB / 10GB`}
        />
        <ProgressBar label="Label only" value={50} />

        <ProgressBar label="hide label prop?" value={25} />

        <ProgressBar label="Hide labels" value={60} />
      </Flex>
    );
  },
};
