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
    autoFormatThousands: {
      control: 'boolean',
      description:
        'Automatically add thousand separators while typing _(Only works with controlled components via onTextChange)_',
      defaultValue: false,
    },
  },
  args: {
    placeholder: '0.00',
    validationStatus: 'initial',
    disabled: false,
    readonly: false,
    focused: false,
    autoFormatThousands: false,
  },
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AutoFormatThousands: Story = {
  parameters: {
    controls: { include: ['autoFormatThousands'] },
  },
  args: { autoFormatThousands: true },
  render: args => {
    const [value, setValue] = useState('1234.56');
    const handleChange = (val: string) => {
      setValue(val);
    };
    return <CurrencyInput {...args} value={value} onChangeText={handleChange} />;
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
          <CurrencyInput readonly />
        </VariantTitle>
        <VariantTitle title="Auto format thousands">
          <CurrencyInput autoFormatThousands value="1234.56" />
        </VariantTitle>
      </Flex>
    );
  },
};
