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
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
  },
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    label: 'Label',
    helperText: 'Helper text',
    validationText: 'Validation text',
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {
  render: args => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

    return (
      <Flex padding="400">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          {...args}
        />
      </Flex>
    );
  },
};
