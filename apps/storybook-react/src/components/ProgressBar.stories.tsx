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
