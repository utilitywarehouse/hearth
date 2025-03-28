import React from 'react';
import { Input } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { VariantTitle } from '../../../docs/components';
import * as Icons from '@utilitywarehouse/react-native-icons';
import { Flex } from '../Flex';
import { EmailMediumIcon } from '@utilitywarehouse/react-native-icons';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

const meta = {
  title: 'Stories / Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'The Input field placeholder',
      defaultValue: '',
    },
    type: {
      control: 'select',
      options: ['text', 'password'],
      description: 'The Input field type',
      defaultValue: 'text',
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'The validation status of the Input component',
      defaultValue: 'initial',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the Input component',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Read only the Input component',
      defaultValue: false,
    },
    focused: {
      control: 'boolean',
      description: 'Focus the Input component',
      defaultValue: false,
    },
    leadingIcon: {
      options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Medium'))],
      control: 'select',
      description: 'The leading icon component for the Input component',
    },
    trailingIcon: {
      options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Medium'))],
      control: 'select',
      description: 'The trailing icon component for the Input component',
    },
  },
  args: {
    placeholder: 'Input placeholder',
    validationStatus: 'initial',
    type: 'text',
    disabled: false,
    readonly: false,
    focused: false,
    leadingIcon: undefined,
    trailingIcon: undefined,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ leadingIcon: leading, trailingIcon: trailing, ...args }) => {
    // @ts-expect-error - This is a playground
    const leadingIcon = leading === 'none' ? undefined : Icons[leading];
    // @ts-expect-error - This is a playground
    const trailingIcon = trailing === 'none' ? undefined : Icons[trailing];
    return <Input {...args} leadingIcon={leadingIcon} trailingIcon={trailingIcon} />;
  },
};

export const Variants: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const [clearableSearchValue, setClearableSearchValue] = React.useState('clearble search');
    const handleClearableSearchChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setClearableSearchValue(e.nativeEvent.text);
    };
    const handleClearableSearchClear = () => {
      setClearableSearchValue('');
    };
    return (
      <Flex direction="column" space="lg">
        <VariantTitle title="Default">
          <Input />
        </VariantTitle>
        <VariantTitle title="With icon">
          <Input leadingIcon={EmailMediumIcon} />
        </VariantTitle>
        <VariantTitle title="With placeholder">
          <Input placeholder="Input placeholder" />
        </VariantTitle>
        <VariantTitle title="With value">
          <Input placeholder="Input placeholder" value="filling the value" />
        </VariantTitle>
        <VariantTitle title="Focused">
          <Input focused placeholder="Input placeholder" value="filling the value" />
        </VariantTitle>
        <VariantTitle title="Type password">
          <Input placeholder="Input placeholder" value="filling the value" type="password" />
        </VariantTitle>
        <VariantTitle title="Type search">
          <Input placeholder="Input placeholder" type="search" />
        </VariantTitle>
        <VariantTitle title="Type search - clearable">
          <Input
            placeholder="Input placeholder"
            type="search"
            value={clearableSearchValue}
            clearable
            onChange={handleClearableSearchChange}
            onClear={handleClearableSearchClear}
          />
        </VariantTitle>
        <VariantTitle title="Type search - loading">
          <Input placeholder="Input placeholder" type="search" loading />
        </VariantTitle>
        <VariantTitle title="Type currency">
          <Input type="currency" />
        </VariantTitle>
        <VariantTitle title="Type date">
          <Input type="date" />
        </VariantTitle>
        <VariantTitle title="Valid">
          <Input validationStatus="valid" placeholder="Input placeholder" />
        </VariantTitle>
        <VariantTitle title="Valid focused">
          <Input validationStatus="valid" focused placeholder="Input placeholder" />
        </VariantTitle>
        <VariantTitle title="Invalid">
          <Input validationStatus="invalid" placeholder="Input placeholder" />
        </VariantTitle>
        <VariantTitle title="Invalid focused">
          <Input validationStatus="invalid" focused placeholder="Input placeholder" />
        </VariantTitle>
        <VariantTitle title="Disabled">
          <Input disabled placeholder="Input placeholder" />
        </VariantTitle>
        <VariantTitle title="Readonly">
          <Input readonly placeholder="Input placeholder" readOnly />
        </VariantTitle>
      </Flex>
    );
  },
};
