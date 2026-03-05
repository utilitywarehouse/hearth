import { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { Platform } from 'react-native';
import { TimePickerInput, View } from '..';
import { VariantTitle, ViewWrap } from '../../../docs/components';
import type { DateType } from '../DatePicker';
import { Flex } from '../Flex';
import { FormField } from '../FormField';

const meta = {
  title: 'Stories / TimePickerInput',
  component: TimePickerInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    format: {
      control: 'text',
      description: 'Day.js format string used to render and parse the value',
      defaultValue: 'HH:mm',
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
      description: 'Accessible label for the time trigger button',
      defaultValue: 'Open time picker',
    },
    autoCloseOnSelect: {
      control: 'boolean',
      description: 'Automatically close the picker after selecting a time',
      defaultValue: false,
    },
  },
  args: {
    format: 'HH:mm',
    validationStatus: 'initial',
    disabled: false,
    readonly: false,
    focused: false,
    openButtonLabel: 'Open time picker',
    autoCloseOnSelect: false,
    placeholder: undefined,
  },
} satisfies Meta<typeof TimePickerInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: typeof meta.args) => {
    const [selected, setSelected] = useState<DateType>();

    const picker = (
      <TimePickerInput
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

export const States: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const [withValue, setWithValue] = useState<DateType>(new Date());
    const [clearableTime, setClearableTime] = useState<DateType>(new Date());
    const [formFieldTime, setFormFieldTime] = useState<DateType>();

    return (
      <Flex direction="column" spacing="lg">
        <VariantTitle title="Default">
          <TimePickerInput />
        </VariantTitle>
        <VariantTitle title="With value">
          <TimePickerInput
            value={withValue}
            onChange={({ date }) => setWithValue(date ?? undefined)}
            onClear={() => setWithValue(undefined)}
          />
        </VariantTitle>
        <VariantTitle title="Disabled">
          <TimePickerInput disabled />
        </VariantTitle>
        <VariantTitle title="Readonly">
          <TimePickerInput readonly value={withValue} />
        </VariantTitle>
        <VariantTitle title="Invalid">
          <TimePickerInput validationStatus="invalid" />
        </VariantTitle>
        <VariantTitle title="Valid">
          <TimePickerInput validationStatus="valid" />
        </VariantTitle>
        <VariantTitle title="With clear action">
          <TimePickerInput
            value={clearableTime}
            onChange={({ date }) => setClearableTime(date ?? undefined)}
            onClear={() => setClearableTime(undefined)}
          />
        </VariantTitle>
        <VariantTitle title="Inside FormField">
          <FormField label="Meeting time" helperText="Pick a time">
            <TimePickerInput
              value={formFieldTime}
              onChange={({ date }) => setFormFieldTime(date ?? undefined)}
              onClear={() => setFormFieldTime(undefined)}
            />
          </FormField>
        </VariantTitle>
      </Flex>
    );
  },
};

export const MinuteIntervals: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const [intervalTime, setIntervalTime] = useState<DateType>();

    const picker = (
      <TimePickerInput
        value={intervalTime}
        onChange={({ date }) => setIntervalTime(date ?? undefined)}
        onClear={() => setIntervalTime(undefined)}
        timePickerProps={{ minuteInterval: 5 }}
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
