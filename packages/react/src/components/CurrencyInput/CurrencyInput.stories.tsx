import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
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

// Expected-failure marker for known component bugs logged in component-bugs.md (repo root).
// Passes while the assertion fails; fails once the bug is fixed, as the cue to remove the wrapper.
const expectToFail = async (assertion: () => Promise<unknown>) => {
  let failed = false;
  try {
    await assertion();
  } catch {
    failed = true;
  }
  await expect(
    failed,
    'Expected failure now passes: remove expectToFail and update component-bugs.md'
  ).toBe(true);
};

/** Shows uncontrolled and controlled usage, plus disableGroupSeparators to remove thousands separators. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
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

/** Set defaultValue for an uncontrolled initial value, or value for a controlled one; both render formatted. */
export const DefaultValue: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <CurrencyInput
        label='defaultValue="12345.67"'
        defaultValue="12345.67"
        onChange={(event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value)}
      />
      <CurrencyInput
        label='value="12345.67"'
        value="12345.67"
        onChange={(event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value)}
      />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const [uncontrolled, controlled] = within(canvasElement).getAllByRole('textbox');

    await expect(uncontrolled).toHaveValue('12,345.67');
    await expect(controlled).toHaveValue('12,345.67');
  },
};

const onAmountChange = fn();

/** Test-only: formatting, sanitising, decimal limit and the raw value passed to onChange. */
export const Formatting: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <CurrencyInput label="Amount" name="amount" onChange={onAmountChange} />
      <CurrencyInput label="Ungrouped" disableGroupSeparators />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    onAmountChange.mockClear();
    const canvas = within(canvasElement);
    const amount = canvas.getByRole('textbox', { name: /^Amount/ });
    const ungrouped = canvas.getByRole('textbox', { name: /^Ungrouped/ });

    await expect(amount).toHaveAttribute('placeholder', '0.00');
    await expect(amount).toHaveAttribute('inputmode', 'decimal');

    await userEvent.type(amount, '1a234567.8.91');
    await expect(amount).toHaveValue('1,234,567.89');
    const lastEvent = onAmountChange.mock.lastCall?.[0] as ChangeEvent<HTMLInputElement>;
    await expect(lastEvent.target.value).toBe('1234567.89');

    // Expected failure — see component-bugs.md and UWDS-5156
    await expectToFail(() => expect(lastEvent.target.name).toBe('amount'));
    await expectToFail(() => expect(typeof lastEvent.preventDefault).toBe('function'));

    await userEvent.type(ungrouped, '1234567');
    await expect(ungrouped).toHaveValue('1234567');
    ungrouped.blur();
  },
};
