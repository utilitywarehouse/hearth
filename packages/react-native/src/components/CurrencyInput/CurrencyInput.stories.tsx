import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CurrencyInput } from '..';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';

const meta = {
  title: 'Stories / CurrencyInput',
  component: CurrencyInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'The CurrencyInput field placeholder',
      defaultValue: '0.00',
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'The validation status',
      defaultValue: 'initial',
    },
    label: {
      control: 'text',
      description: 'The label for the CurrencyInput',
      defaultValue: 'Currency Input Label',
    },
    helperText: {
      control: 'text',
      description: 'The helper text for the CurrencyInput',
      defaultValue: 'Supporting text',
    },
    labelVariant: {
      control: 'radio',
      options: ['heading', 'body'],
      description: 'The label text variant',
    },
    helperIcon: {
      control: 'object',
      description: 'The helper icon component',
    },
    validText: {
      control: 'text',
      description: 'The valid text for the CurrencyInput',
      defaultValue: 'Valid text',
    },
    invalidText: {
      control: 'text',
      description: 'The invalid text for the CurrencyInput',
      defaultValue: 'Invalid text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Read only',
      defaultValue: false,
    },
    focused: {
      control: 'boolean',
      description: 'Focused',
      defaultValue: false,
    },
    disableGroupSeparator: {
      control: 'boolean',
      description:
        'Disable automatic adding of thousand separators while typing _(Formatting only works with controlled components via onChangeText)_',
      defaultValue: false,
    },
  },
  args: {
    placeholder: '0.00',
    validationStatus: 'initial',
    disabled: false,
    readonly: false,
    focused: false,
    disableGroupSeparator: false,
  },
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => {
    const [value, setValue] = useState('12345.67');
    return <CurrencyInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const DisableGroupSeparator: Story = {
  parameters: {
    controls: { include: ['disableGroupSeparator'] },
  },
  args: { disableGroupSeparator: true },
  render: args => {
    const [value, setValue] = useState('12345.67');
    return <CurrencyInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const States: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    return (
      <Flex direction="column" space="lg">
        <VariantTitle title="Default">
          <CurrencyInput />
        </VariantTitle>
        <VariantTitle title="With placeholder">
          <CurrencyInput placeholder="0.00" />
        </VariantTitle>
        <VariantTitle title="Focused">
          <CurrencyInput focused value="12.34" />
        </VariantTitle>
        <VariantTitle title="Valid">
          <CurrencyInput validationStatus="valid" />
        </VariantTitle>
        <VariantTitle title="Invalid">
          <CurrencyInput validationStatus="invalid" />
        </VariantTitle>
        <VariantTitle title="Valid - Focused">
          <CurrencyInput validationStatus="valid" focused />
        </VariantTitle>
        <VariantTitle title="Invalid - Focused">
          <CurrencyInput validationStatus="invalid" focused />
        </VariantTitle>
        <VariantTitle title="Disabled">
          <CurrencyInput disabled />
        </VariantTitle>
        <VariantTitle title="Readonly">
          <CurrencyInput readonly value="11666" />
        </VariantTitle>
        <VariantTitle title="Disable auto format thousands">
          <CurrencyInput disableGroupSeparator value="1234.56" />
        </VariantTitle>
      </Flex>
    );
  },
};
