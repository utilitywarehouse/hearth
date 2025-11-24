import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker, Flex } from '@utilitywarehouse/hearth-react';
import React from 'react';

const meta: Meta<typeof DatePicker> = {
  title: 'Stories / DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component:
          'An `Alert` is a visual label or indicator used to convey status or highlight content. Alerts are read-only status indicators or labels and are not interactive.',
      },
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

    return (
      <Flex paddingTop="400" marginLeft="800">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
        />
      </Flex>
    );
  },
};
