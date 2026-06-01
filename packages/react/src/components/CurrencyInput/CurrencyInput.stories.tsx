import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { CurrencyInput } from './CurrencyInput';
import { useState, ChangeEvent } from 'react';

const meta: Meta<typeof CurrencyInput> = {
  title: 'Components / CurrencyInput',
  component: CurrencyInput,
  argTypes: {
    placeholder: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
    disableGroupSeparators: { control: { type: 'boolean' } },
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

export const KitchenSink: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: args => {
    const [value, setValue] = useState<string>('');
    const [separatorsValue, setSeparatorsValue] = useState<string>('1234567.89');
    return (
      <Flex direction="column" gap="400">
        <CurrencyInput
          {...args}
          label="Uncontrolled"
          onChange={(event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value)}
        />
        <CurrencyInput
          {...args}
          label="Controlled"
          helperText={`Value: ${value}`}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
        />
        <CurrencyInput
          {...args}
          required
          label="Group separators"
          value={separatorsValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSeparatorsValue(event.target.value)
          }
        />
        <CurrencyInput
          {...args}
          required
          label="Group separators disabled"
          disableGroupSeparators
          value={separatorsValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSeparatorsValue(event.target.value)
          }
        />
      </Flex>
    );
  },
};

// Bug verification: defaultValue is ignored because the component always sets value={...}
// Expected: input pre-filled with "12,345.67" — Actual: input is empty
export const DefaultValue: Story = {
  parameters: { controls: { include: [] } },
  render: () => (
    <Flex direction="column" gap="400">
      <CurrencyInput
        label='defaultValue="12345.67" (bug: renders empty)'
        defaultValue="12345.67"
        onChange={(event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value)}
      />
      <CurrencyInput
        label='value="12345.67" (correct: renders formatted)'
        value="12345.67"
        onChange={(event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value)}
      />
    </Flex>
  ),
};
