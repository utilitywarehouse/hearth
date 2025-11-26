import type { Meta, StoryObj } from '@storybook/react-native';
import { TickSmallIcon, WarningSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Flex, Heading } from '../../components';
import { DateInput } from './';

const DateInputMeta: Meta<typeof DateInput> = {
  title: 'Stories / DateInput',
  component: DateInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    hideDay: {
      control: 'boolean',
    },
    hideMonth: {
      control: 'boolean',
    },
    hideYear: {
      control: 'boolean',
    },
  },
};

export default DateInputMeta;

type Story = StoryObj<typeof DateInput>;

export const Playground: Story = {
  args: {
    label: 'Date',
    helperText: 'Helper text',
  },
};

export const DateOfBirth: Story = {
  render: () => {
    return <DateInput label="Date of birth" helperText="Enter your date of birth" required />;
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
        monthValue={month}
        yearValue={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
        hideDay
        required
      />
    );
  },
};

export const YearOnly: Story = {
  render: () => {
    return <DateInput label="Year" helperText="Enter the year" hideDay hideMonth />;
  },
};

export const Validation: Story = {
  render: () => {
    const [day, setDay] = useState('01');
    const [month, setMonth] = useState('02');
    const [year, setYear] = useState('2025');
    return (
      <View style={{ gap: 16 }}>
        <DateInput
          label="Valid date"
          dayValue={day}
          monthValue={month}
          yearValue={year}
          onDayChange={setDay}
          onMonthChange={setMonth}
          onYearChange={setYear}
          validationStatus="valid"
          validText="Date is valid"
          helperIcon={TickSmallIcon}
          required
        />
        <DateInput
          label="Invalid date"
          dayValue="32"
          monthValue="13"
          yearValue="2025"
          validationStatus="invalid"
          invalidText="Please enter a valid date"
          helperIcon={WarningSmallIcon}
          required
        />
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <DateInput
        label="Date of birth"
        helperText="This field is disabled"
        dayValue="15"
        monthValue="06"
        yearValue="1990"
        disabled
      />
    );
  },
};

export const DefaultValue: Story = {
  render: () => {
    return <DateInput label="Date of birth" dayValue="01" monthValue="01" yearValue="2000" />;
  },
};

export const WithCustomValidation: Story = {
  render: () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const validateDate = () => {
      if (!day || !month || !year) return { status: 'initial' as const, message: '' };

      const dayNum = parseInt(day, 10);
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);

      // Basic validation
      if (dayNum < 1 || dayNum > 31) {
        return { status: 'invalid' as const, message: 'Day must be between 1 and 31' };
      }
      if (monthNum < 1 || monthNum > 12) {
        return { status: 'invalid' as const, message: 'Month must be between 1 and 12' };
      }
      if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
        return {
          status: 'invalid' as const,
          message: `Year must be between 1900 and ${new Date().getFullYear()}`,
        };
      }

      // Check valid date
      const date = new Date(yearNum, monthNum - 1, dayNum);
      if (
        date.getDate() !== dayNum ||
        date.getMonth() !== monthNum - 1 ||
        date.getFullYear() !== yearNum
      ) {
        return { status: 'invalid' as const, message: 'Please enter a valid date' };
      }

      return { status: 'valid' as const, message: 'Valid date' };
    };

    const validation = validateDate();

    return (
      <DateInput
        label="Date of birth"
        helperText="Enter a valid date between 1900 and today"
        dayValue={day}
        monthValue={month}
        yearValue={year}
        onDayChange={setDay}
        onMonthChange={setMonth}
        onYearChange={setYear}
        validationStatus={validation.status}
        validText={validation.status === 'valid' ? validation.message : undefined}
        invalidText={validation.status === 'invalid' ? validation.message : undefined}
        required
      />
    );
  },
};

export const FlexibleSegments: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <DateInput label="Full date" helperText="DD/MM/YYYY" />
      <DateInput label="Month and year" helperText="MM/YYYY" hideDay required />
      <DateInput label="Year only" helperText="YYYY" hideDay hideMonth required />
    </View>
  ),
};

export const GroupingInputs: Story = {
  render: () => (
    <Flex space="sm">
      <Heading size="lg">Event Registration</Heading>
      <Card variant="subtle" gap="250">
        <DateInput label="Date of birth" helperText="Enter your date of birth" required />
        <DateInput
          label="Event date preference"
          helperText="Select your preferred date"
          required={false}
        />
      </Card>
    </Flex>
  ),
};

export const WithState: Story = {
  render: () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleReset = () => {
      setDay('');
      setMonth('');
      setYear('');
    };

    const handleSetToday = () => {
      const today = new Date();
      setDay(String(today.getDate()).padStart(2, '0'));
      setMonth(String(today.getMonth() + 1).padStart(2, '0'));
      setYear(String(today.getFullYear()));
    };

    return (
      <Flex space="md">
        <DateInput
          label="Date"
          helperText="Select or enter a date"
          dayValue={day}
          monthValue={month}
          yearValue={year}
          onDayChange={setDay}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
        <Flex space="xs">
          <Button onPress={handleSetToday}>Set to Today</Button>
          <Button onPress={handleReset} variant="solid">
            Reset
          </Button>
        </Flex>
      </Flex>
    );
  },
};
