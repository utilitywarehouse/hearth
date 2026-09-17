import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Platform } from 'react-native';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { DatePickerInput, View } from '..';
import { VariantTitle, ViewWrap } from '../../../docs/components';
import type { DateType } from '../DatePicker';
import { Flex } from '../Flex';
import { FormField } from '../FormField';

const meta = {
  title: 'Stories / DatePickerInput',
  component: DatePickerInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    format: {
      control: 'text',
      description: 'Day.js format string used to render and parse the value',
      defaultValue: 'DD/MM/YYYY',
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'Manually set the validation status',
      defaultValue: 'initial',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input and trigger button',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Make the input read-only (typing disabled, picker still accessible)',
      defaultValue: false,
    },
    focused: {
      control: 'boolean',
      description: 'Force the focused visual state',
      defaultValue: false,
    },
    openButtonLabel: {
      control: 'text',
      description: 'Accessible label for the calendar trigger button',
      defaultValue: 'Open date picker',
    },
    autoCloseOnSelect: {
      control: 'boolean',
      description: 'Automatically close the picker after selecting a date',
      defaultValue: false,
    },
    disableManualEntry: {
      control: 'boolean',
      description: 'Block keyboard entry and open the picker when tapping anywhere on the field',
      defaultValue: false,
    },
  },
  args: {
    format: 'DD/MM/YYYY',
    validationStatus: 'initial',
    disabled: false,
    readonly: false,
    focused: false,
    openButtonLabel: 'Open date picker',
    autoCloseOnSelect: false,
    placeholder: 'DD/MM/YYYY',
    disableManualEntry: false,
  },
} satisfies Meta<typeof DatePickerInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => {
    const [selected, setSelected] = useState<DateType>();

    const picker = (
      <DatePickerInput
        {...args}
        value={selected}
        onChange={({ date }) => setSelected(date ?? undefined)}
        onClear={() => setSelected(undefined)}
      />
    );

    if (Platform.OS !== 'web') {
      return picker;
    }

    return (
      <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
        <ViewWrap>{picker}</ViewWrap>
      </View>
    );
  },
};

export const CustomFormat: Story = {
  parameters: {
    controls: { include: ['format'] },
  },
  args: {
    format: 'YYYY-MM-DD',
    placeholder: 'YYYY-MM-DD',
  },
  render: args => {
    const [selected, setSelected] = useState<DateType>(new Date());

    const picker = (
      <DatePickerInput
        {...args}
        value={selected}
        onChange={({ date }) => setSelected(date ?? undefined)}
        onClear={() => setSelected(undefined)}
      />
    );

    if (Platform.OS !== 'web') {
      return picker;
    }

    return <ViewWrap>{picker}</ViewWrap>;
  },
};

export const DisableManualEntry: Story = {
  args: {
    disableManualEntry: true,
  },
  render: args => {
    const [selected, setSelected] = useState<DateType>();

    const picker = (
      <DatePickerInput
        {...args}
        value={selected}
        onChange={({ date }) => setSelected(date ?? undefined)}
        onClear={() => setSelected(undefined)}
      />
    );

    if (Platform.OS !== 'web') {
      return picker;
    }

    return (
      <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
        <ViewWrap>{picker}</ViewWrap>
      </View>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');

    const openButton = canvas.getByRole('button', { name: 'Open date picker' });
    expect(openButton).not.toBeDisabled();

    // Tapping anywhere on the field (not just the trailing icon) should open the picker.
    // The field itself is `pointer-events: none` when manual entry is disabled, so the
    // tap target is its wrapping Pressable, not the input element.
    await userEvent.click(input.parentElement as HTMLElement);
    const okButton = await canvas.findByRole('button', { name: 'Ok' });
    expect(okButton).toBeInTheDocument();

    // Close the sheet so it doesn't leak into subsequent test/story runs.
    await userEvent.click(canvas.getByRole('button', { name: 'Cancel' }));
    await waitFor(() => {
      expect(canvas.queryByRole('button', { name: 'Ok' })).not.toBeInTheDocument();
    });
  },
};

export const States: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const [withValue, setWithValue] = useState<DateType>(new Date());
    const [clearableDate, setClearableDate] = useState<DateType>(new Date());
    const [formFieldDate, setFormFieldDate] = useState<DateType>();

    return (
      <Flex direction="column" spacing="lg">
        <VariantTitle title="Default">
          <DatePickerInput placeholder="DD/MM/YYYY" />
        </VariantTitle>
        <VariantTitle title="With value">
          <DatePickerInput
            value={withValue}
            onChange={({ date }) => setWithValue(date ?? undefined)}
            onClear={() => setWithValue(undefined)}
          />
        </VariantTitle>
        <VariantTitle title="Disabled">
          <DatePickerInput disabled placeholder="DD/MM/YYYY" />
        </VariantTitle>
        <VariantTitle title="Readonly">
          <DatePickerInput readonly value={withValue} />
        </VariantTitle>
        <VariantTitle title="Disable manual entry">
          <DatePickerInput disableManualEntry placeholder="DD/MM/YYYY" />
        </VariantTitle>
        <VariantTitle title="Invalid">
          <DatePickerInput validationStatus="invalid" placeholder="DD/MM/YYYY" />
        </VariantTitle>
        <VariantTitle title="Valid">
          <DatePickerInput validationStatus="valid" placeholder="DD/MM/YYYY" />
        </VariantTitle>
        <VariantTitle title="Custom format">
          <DatePickerInput format="MMM D, YYYY" placeholder="MMM D, YYYY" />
        </VariantTitle>
        <VariantTitle title="With clear action">
          <DatePickerInput
            value={clearableDate}
            onChange={({ date }) => setClearableDate(date ?? undefined)}
            onClear={() => setClearableDate(undefined)}
          />
        </VariantTitle>
        <VariantTitle title="Inside FormField">
          <FormField label="Booking date" helperText="Pick a date">
            <DatePickerInput
              value={formFieldDate}
              onChange={({ date }) => setFormFieldDate(date ?? undefined)}
              onClear={() => setFormFieldDate(undefined)}
            />
          </FormField>
        </VariantTitle>
      </Flex>
    );
  },
};
