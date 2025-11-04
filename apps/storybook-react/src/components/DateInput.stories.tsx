import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateInput, Flex } from '@utilitywarehouse/hearth-react';
import { useState } from 'react';

const meta: Meta<typeof DateInput> = {
  title: 'Stories / DateInput',
  component: DateInput,
  parameters: {
    docs: {
      description: {
        component:
          "Use the Date Input to ask users to enter a date manually that may include the day, month, and year. It's commonly used in form patterns.",
      },
    },
  },
  argTypes: {
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    showDay: { control: { type: 'boolean' } },
    showMonth: { control: { type: 'boolean' } },
    showYear: { control: { type: 'boolean' } },
  },
  args: {
    label: 'Date',
    helperText: 'Helper text',
    validationText: 'Validation text',
    disabled: false,
    required: false,
    showDay: true,
    showMonth: true,
    showYear: true,
  },
};

export default meta;
type Story = StoryObj<typeof DateInput>;

export const Playground: Story = {};

export const DateOfBirth: Story = {
  render: () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    return (
      <DateInput
        label="Date of birth"
        helperText="Enter your date of birth"
        day={day}
        month={month}
        year={year}
        onDayChange={setDay}
        onMonthChange={setMonth}
        onYearChange={setYear}
        required
      />
    );
  },
};

export const CardExpiry: Story = {
  render: () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    return (
      <DateInput
        label="Card expiry"
        helperText="Enter the expiry month and year"
        month={month}
        year={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
        showDay={false}
        required
      />
    );
  },
};

export const YearOnly: Story = {
  render: () => {
    const [year, setYear] = useState('');
    return (
      <DateInput
        label="Year"
        helperText="Enter the year"
        year={year}
        onYearChange={setYear}
        showDay={false}
        showMonth={false}
        required
      />
    );
  },
};

export const Validation: Story = {
  render: () => {
    const [day, setDay] = useState('01');
    const [month, setMonth] = useState('02');
    const [year, setYear] = useState('2025');
    return (
      <Flex direction="column" gap="400">
        <DateInput
          label="Valid date"
          day={day}
          month={month}
          year={year}
          onDayChange={setDay}
          onMonthChange={setMonth}
          onYearChange={setYear}
          validationStatus="valid"
          validationText="Date is valid"
          required
        />
        <DateInput
          label="Invalid date"
          day="32"
          month="13"
          year="2025"
          validationStatus="invalid"
          validationText="Please enter a valid date"
          required
        />
      </Flex>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <DateInput
        label="Date of birth"
        helperText="This field is disabled"
        day="15"
        month="06"
        year="1990"
        disabled
      />
    );
  },
};

export const DefaultValue: Story = {
  render: () => {
    return (
      <DateInput
        label="Date of birth"
        helperText="Uncontrolled with default value"
        defaultDay="01"
        defaultMonth="01"
        defaultYear="2000"
      />
    );
  },
};
