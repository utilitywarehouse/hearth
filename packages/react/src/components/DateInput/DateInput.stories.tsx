import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
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

/**
 * Visual matrix of DateInput states — used in docs and Chromatic snapshot testing.
 * Not a usage reference.
 */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: () => {
    const [day, setDay] = useState('01');
    const [month, setMonth] = useState('02');
    const [year, setYear] = useState('2025');
    return (
      <Flex gap="400" direction="column">
        <DateInput
          label="Date"
          helperText="Helper text"
          dayValue="15"
          monthValue="06"
          yearValue="1990"
        />
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
        <DateInput
          label="Date of birth"
          helperText="This field is disabled"
          dayValue="15"
          monthValue="06"
          yearValue="1990"
          disabled
        />
      </Flex>
    );
  },
};

/** A DateInput with day, month, and year values set via controlled props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', { name: 'Date' });

    await expect(group).toHaveAccessibleDescription('Helper text');
    await expect(within(group).getByRole('textbox', { name: 'Day' })).toHaveValue('15');
    await expect(within(group).getByRole('textbox', { name: 'Month' })).toHaveValue('06');
    await expect(within(group).getByRole('textbox', { name: 'Year' })).toHaveValue('1990');
  },
};

/** Set validationStatus and validationText to show valid or invalid feedback. */
export const Validation: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const valid = canvas.getByRole('group', { name: 'Valid date' });
    const invalid = canvas.getByRole('group', { name: 'Invalid date' });

    await expect(valid).not.toHaveAttribute('aria-invalid', 'true');
    await expect(invalid).toHaveAttribute('aria-invalid', 'true');
    await expect(invalid).toHaveAccessibleDescription('Please enter a valid date');
    for (const segment of within(invalid).getAllByRole('textbox')) {
      await expect(segment).toHaveAttribute('aria-invalid', 'true');
    }
  },
};

/** Set disabled to prevent the fields from being edited. */
export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
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
  play: async ({ canvasElement }) => {
    for (const segment of within(canvasElement).getAllByRole('textbox')) {
      await expect(segment).toBeDisabled();
    }
  },
};

/** Use defaultDayValue, defaultMonthValue, and defaultYearValue for an uncontrolled initial value. */
export const DefaultValue: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const day = canvas.getByRole('textbox', { name: 'Day' });
    const month = canvas.getByRole('textbox', { name: 'Month' });
    const year = canvas.getByRole('textbox', { name: 'Year' });

    await expect(day).toHaveValue('01');
    await userEvent.clear(day);
    await userEvent.type(day, '123');
    await expect(day).toHaveValue('12');

    await userEvent.clear(month);
    await userEvent.type(month, '123');
    await expect(month).toHaveValue('12');

    await userEvent.clear(year);
    await userEvent.type(year, '20245');
    await expect(year).toHaveValue('2024');
    year.blur();
  },
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

/** Validate the entered date on every change and update validationStatus and validationText accordingly. */
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

/** Use hideDay and hideMonth to collect only the date segments you need. */
export const FlexibleSegments: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <DateInput label="Full date" helperText="DD/MM/YYYY" />
      <DateInput label="Month and year" helperText="MM/YYYY" hideDay required />
      <DateInput label="Year only" helperText="YYYY" hideDay hideMonth required />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textboxNames = (name: string) =>
      within(canvas.getByRole('group', { name }))
        .getAllByRole('textbox')
        .map(segment => segment.getAttribute('name')?.split('-').pop());

    await expect(textboxNames('Full date')).toEqual(['day', 'month', 'year']);
    await expect(textboxNames('Month and year')).toEqual(['month', 'year']);
    await expect(textboxNames('Year only')).toEqual(['year']);
  },
};

/** Group multiple DateInputs under a shared fieldset with a legend and helper text. */
export const GroupingInputs: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
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

/** Test-only: a consumer's aria-describedby and aria-errormessage are kept. */
export const ConsumerDescribedBy: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <p id="external-description">External description</p>
      <DateInput
        label="Described date"
        helperText="Helper text"
        aria-describedby="external-description"
      />
      <DateInput
        label="Custom error date"
        validationStatus="invalid"
        aria-errormessage="external-description"
      />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const group = within(canvasElement).getByRole('group', { name: 'Described date' });

    await expect(group).toHaveAccessibleDescription('External description Helper text');
    await expect(
      within(canvasElement).getByRole('group', { name: 'Custom error date' })
    ).toHaveAttribute('aria-errormessage', 'external-description');
  },
};
