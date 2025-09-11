import type { Meta } from '@storybook/react-vite';
import {
  BellSmallIcon,
  HeartSmallIcon,
  UserSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useState } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { FormField } from '../FormField';
import Select from './Select';
import SelectOption from './SelectOption';

const meta = {
  title: 'Stories / Select',
  component: Select,
  parameters: {
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the select',
      defaultValue: 'Choose an option',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text to show when no value is selected',
      defaultValue: 'Select an option',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the select is readonly',
      defaultValue: false,
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'The validation status of the select',
      defaultValue: 'initial',
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
      defaultValue: true,
    },
    menuHeading: {
      control: 'text',
      description: 'The heading to display in the bottom sheet',
    },
    emptyText: {
      control: 'text',
      description: 'Text to display when no options are available',
      defaultValue: 'No options available',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether to enable search functionality',
      defaultValue: false,
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Search placeholder text',
      defaultValue: 'Search',
    },
  },
  args: {
    label: 'Choose an option',
    placeholder: 'Select an option',
    disabled: false,
    readonly: false,
    validationStatus: 'initial',
    required: true,
    emptyText: 'No options available',
    searchable: false,
    searchPlaceholder: 'Search',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;

export const Playground = ({ ...args }) => {
  const [value, setValue] = useState<string | null>(null);
  const handleValueChange = (newValue: string | null) => {
    setValue(newValue);
    console.log('Selected value:', newValue);
  };
  return (
    <Select
      value={value}
      onValueChange={handleValueChange}
      {...args}
      options={Array.from({ length: 100 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: `${i + 1}`,
      }))}
    />
  );
};

export const WithMenuHeading = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label="Choose an option"
      placeholder="Select an option"
      menuHeading="This is a menu heading"
      options={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};

export const Disabled = () => {
  const [value, setValue] = useState<string | null>('2');

  return (
    <Select
      label="Choose an option"
      placeholder="Select an option"
      disabled
      options={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};

export const WithValidationStatus = () => {
  const [value, setValue] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>('2');

  return (
    <Box gap="200">
      <FormField
        validationStatus={value ? 'initial' : 'invalid'}
        label="Invalid select"
        invalidText="Please select a value"
      >
        <Select
          placeholder="Select an option"
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
          value={value}
          onValueChange={setValue}
        />
      </FormField>
      {!!value && <Button text="Clear value" onPress={() => setValue(null)} />}
      <FormField validationStatus="valid" label="Valid select">
        <Select
          placeholder="Select an option"
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
          value={value2}
          onValueChange={setValue2}
        />
      </FormField>
    </Box>
  );
};

export const Optional = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <FormField label="Field label" required={false}>
      <Select
        placeholder="Select an option"
        menuHeading="Optionally select an option"
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
        value={value}
        onValueChange={setValue}
      />
    </FormField>
  );
};

export const WithDisabledOption = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <FormField label="Field label">
      <Select
        placeholder="Select an option"
        options={[
          { label: 'Option 1', value: '1', disabled: true },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
        value={value}
        onValueChange={setValue}
      />
    </FormField>
  );
};

export const Searchable = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label="Searchable select"
      placeholder="Select a country"
      menuHeading="Searchable countries"
      searchable
      searchPlaceholder="Search countries..."
      options={[
        { label: 'United Kingdom', value: 'uk' },
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'Australia', value: 'au' },
        { label: 'France', value: 'fr' },
        { label: 'Germany', value: 'de' },
        { label: 'Japan', value: 'jp' },
        { label: 'Brazil', value: 'br' },
        { label: 'India', value: 'in' },
        { label: 'South Africa', value: 'za' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};

export const WithInlineOptions = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleValueChange = (newValue: string | null) => {
    setValue(newValue);
    console.log('Selected value:', newValue);
  };
  return (
    <Select
      label="Custom options"
      placeholder="Select an option"
      value={value}
      onValueChange={handleValueChange}
    >
      <SelectOption label="Home option" value="home" leadingIcon={UserSmallIcon} />
      <SelectOption label="Car option" value="car" leadingIcon={HeartSmallIcon} />
      <SelectOption label="World option" value="world" leadingIcon={BellSmallIcon} />
    </Select>
  );
};

export const Empty = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label="Empty select"
      placeholder="No options available"
      options={[]}
      value={value}
      onValueChange={setValue}
      emptyText="No options available at the moment"
    />
  );
};
