import type { Meta, StoryObj } from '@storybook/react-vite';
import { CurrencyInput } from '@utilitywarehouse/hearth-react';
import React from 'react';

const meta: Meta<typeof CurrencyInput> = {
  title: 'Stories / CurrencyInput',
  component: CurrencyInput,
  parameters: {
    docs: {
      description: {
        component:
          '`CurrencyInput` is an interactive field that specifically used for entering monetary amounts. It’s commonly used across Cashback and payment areas.',
      },
    },
  },
  argTypes: {
    placeholder: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    validationText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
  },
  args: {
    label: 'Amount',
    disabled: false,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof CurrencyInput>;

export const Playground: Story = {
  render: args => {
    const [value, setValue] = React.useState<string>('');
    return (
      <CurrencyInput
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
        {...args}
      />
    );
  },
};
