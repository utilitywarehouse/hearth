import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { HelperText } from '../HelperText/HelperText';
import { DateInput } from './DateInput';
import { useState } from 'react';

const meta: Meta<typeof DateInput> = {
  title: 'Components / DateInput',
  component: DateInput,
  argTypes: {
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    hideDay: { control: { type: 'boolean' } },
    hideMonth: { control: { type: 'boolean' } },
    hideYear: { control: { type: 'boolean' } },
  },
  args: {
    label: 'Date',
    helperText: 'Helper text',
    validationText: 'Validation text',
  },
};

export default meta;
type Story = StoryObj<typeof DateInput>;

export const Playground: Story = {
  render: () => {
    return (
      <DateInput
        label="Date"
        helperText="Helper text"
        dayValue="15"
        monthValue="06"
        yearValue="1990"
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
          dayValue={day}
          monthValue={month}
          yearValue={year}
          onDayChange={(event: React.ChangeEvent<HTMLInputElement>) => setDay(event.target.value)}
          onMonthChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setMonth(event.target.value)
          }
          onYearChange={(event: React.ChangeEvent<HTMLInputElement>) => setYear(event.target.value)}
          validationStatus="valid"
          validationText="Date is valid"
          required
        />
        <DateInput
          label="Invalid date"
          dayValue="32"
          monthValue="13"
          yearValue="2025"
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
    return (
      <DateInput
        label="Date of birth"
        defaultDayValue="01"
        defaultMonthValue="01"
        defaultYearValue="2000"
      />
    );
  },
};

export const WithCustomValidation: Story = {
  render: () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const validateDate = () => {
      if (!day || !month || !year) return { status: undefined, message: '' };

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
        onDayChange={(event: React.ChangeEvent<HTMLInputElement>) => setDay(event.target.value)}
        onMonthChange={(event: React.ChangeEvent<HTMLInputElement>) => setMonth(event.target.value)}
        onYearChange={(event: React.ChangeEvent<HTMLInputElement>) => setYear(event.target.value)}
        validationStatus={validation.status}
        validationText={validation.message}
        required
      />
    );
  },
};

export const FlexibleSegments: Story = {
  render: () => (
    <Flex direction="column" gap="400">
      <DateInput label="Full date" helperText="DD/MM/YYYY" />
      <DateInput label="Month and year" helperText="MM/YYYY" hideDay required />
      <DateInput label="Year only" helperText="YYYY" hideDay hideMonth required />
    </Flex>
  ),
};

export const GroupingInputs: Story = {
  render: () => (
    <Flex asChild direction="column" gap="200">
      <fieldset>
        <Heading asChild as="h3" size="lg">
          <legend>Event Registration</legend>
        </Heading>
        <HelperText id="event-info">Please enter your details for the event</HelperText>
        <Card variant="subtle" direction="column" gap="250">
          <DateInput
            label="Date of birth"
            helperText="Enter your date of birth"
            required
            aria-describedby="event-info"
          />
          <DateInput
            label="Event date preference"
            helperText="Select your preferred date"
            aria-describedby="event-info"
          />
        </Card>
      </fieldset>
    </Flex>
  ),
};
