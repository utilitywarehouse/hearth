import type { Meta } from '@storybook/react';
import React, { useState } from 'react';
import Select from './Select';
import SelectOption from './SelectOption';
import { FormField } from '../FormField';
import { View } from 'react-native';
import {
  UserSmallIcon,
  HeartSmallIcon,
  StarSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const meta = {
  title: 'Stories / Select',
  component: Select,
  parameters: {
    status: {
      type: 'stable',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;

export const Basic = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleValueChange = (newValue: string | null) => {
    setValue(newValue);
    console.log('Selected value:', newValue);
  };
  return (
    <Select
      label="Choose an option"
      placeholder="Select an option"
      items={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ]}
      value={value}
      onValueChange={handleValueChange}
    />
  );
};

export const WithIcon = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label="Choose an option"
      placeholder="Select an option"
      leadingIcon={UserSmallIcon}
      items={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};

export const WithItemIcons = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label="Choose an option"
      placeholder="Select an option"
      items={[
        { label: 'Home', value: 'home', leftIcon: UserSmallIcon },
        { label: 'Car', value: 'car', leftIcon: HeartSmallIcon },
        { label: 'World', value: 'world', leftIcon: StarSmallIcon },
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
      items={[
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

  return (
    <View style={{ gap: 16 }}>
      <FormField
        validationStatus="invalid"
        label="Invalid select"
        invalidText="Please select a value"
      >
        <Select
          placeholder="Select an option"
          items={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
          value={value}
          onValueChange={setValue}
        />
      </FormField>

      <FormField validationStatus="valid" label="Valid select">
        <Select
          placeholder="Select an option"
          items={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
          value="2"
          onValueChange={setValue}
        />
      </FormField>
    </View>
  );
};

export const Required = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <FormField label="Required field" required>
      <Select
        placeholder="Select an option"
        items={[
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

export const Searchable = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label="Searchable select"
      placeholder="Select a country"
      searchable
      searchPlaceholder="Search countries..."
      items={[
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

export const WithCustomChildren = () => {
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
      <SelectOption label="Home option" value="home" leftIcon={UserSmallIcon} />
      <SelectOption label="Car option" value="car" leftIcon={HeartSmallIcon} />
      <SelectOption label="World option" value="world" leftIcon={StarSmallIcon} />
    </Select>
  );
};

export const Empty = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label="Empty select"
      placeholder="No options available"
      items={[]}
      value={value}
      onValueChange={setValue}
      emptyText="No options available at the moment"
    />
  );
};
