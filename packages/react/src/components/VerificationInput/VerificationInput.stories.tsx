import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Flex } from '../Flex/Flex';
import { VerificationInput } from './VerificationInput';
import { useState } from 'react';

const meta: Meta<typeof VerificationInput> = {
  title: 'Components / VerificationInput',
  component: VerificationInput,
  argTypes: {
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    validationText: 'Validation text',
    disabled: false,
    readOnly: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof VerificationInput>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    interactions: { disable: true },
  },
};

/** Control the value with value and onValueChange instead of relying on internal state. */
export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => {
    const [value, setValue] = useState('');
    return (
      <VerificationInput
        {...args}
        label="Controlled"
        name="controlled"
        helperText={value && `Your OTP is: ${value}`}
        value={value}
        onValueChange={setValue}
        required
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    await expect(inputs).toHaveLength(6);

    await userEvent.click(inputs[0]!);
    await userEvent.keyboard('123456');
    await expect(canvas.getByText('Your OTP is: 123456')).toBeInTheDocument();
    (document.activeElement as HTMLElement | null)?.blur();
  },
};

/** Set type="password" to mask each digit as it's entered. */
export const PasswordType: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <VerificationInput
        {...args}
        type="password"
        label="Password type"
        name="password-type"
        value={value}
        onValueChange={setValue}
        required
      />
    );
  },
  play: async ({ canvasElement }) => {
    const inputs = canvasElement.querySelectorAll(
      '.h-VerificationInputRoot input:not([type="hidden"])'
    );

    await expect(inputs).toHaveLength(6);
    for (const input of inputs) {
      await expect(input).toHaveAttribute('type', 'password');
    }
  },
};

/** Test-only: a disabled or read-only VerificationInput isn't marked invalid while its validation text is hidden. */
export const HiddenValidationNotInvalid: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      <VerificationInput
        label="Invalid"
        validationStatus="invalid"
        validationText="Invalid error"
      />
      <VerificationInput
        label="Disabled invalid"
        disabled
        validationStatus="invalid"
        validationText="Disabled error"
      />
      <VerificationInput
        label="Read-only invalid"
        readOnly
        validationStatus="invalid"
        validationText="Read-only error"
      />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [invalid, disabled, readOnly] = canvasElement.querySelectorAll(
      '.h-VerificationInputRoot'
    );

    await expect(invalid).toHaveAttribute('aria-invalid', 'true');
    await expect(invalid).toHaveAccessibleDescription(/Invalid error/);
    for (const hidden of [disabled, readOnly]) {
      await expect(hidden).not.toHaveAttribute('aria-invalid');
      await expect(hidden).not.toHaveAttribute('aria-errormessage');
    }
    await expect(canvas.queryByText('Disabled error')).not.toBeInTheDocument();
    await expect(canvas.queryByText('Read-only error')).not.toBeInTheDocument();
  },
};
