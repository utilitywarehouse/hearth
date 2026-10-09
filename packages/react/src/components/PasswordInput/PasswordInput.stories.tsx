import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Flex } from '../Flex/Flex';
import { PasswordInput } from './PasswordInput';
import { useState, ChangeEvent } from 'react';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components / PasswordInput',
  component: PasswordInput,
  argTypes: {
    placeholder: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    validationText: { control: { type: 'text' } },
  },
  args: {
    label: 'Password',
    helperText: undefined,
    required: true,
    autoComplete: 'new-password',
    disabled: false,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

/** Visual matrix of PasswordInput props. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    controls: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Flex direction="column" gap="400">
      <PasswordInput {...args} />
      <PasswordInput
        {...args}
        label="Disabled"
        disabled
        helperText="Please enter your username first"
      />
      <PasswordInput {...args} label="Read only" readOnly value="password123" />
      <PasswordInput
        {...args}
        label="Password"
        value="password123"
        validationStatus="valid"
        validationText="Strong password"
      />
      <PasswordInput
        {...args}
        label="Password"
        value="short"
        validationStatus="invalid"
        validationText="Please enter a password with at least 73 characters"
      />
    </Flex>
  ),
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
  },
  render: args => <PasswordInput {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/^Password/, { selector: 'input' });
    const toggle = canvas.getByRole('button', { name: 'toggle password visibility' });

    await expect(input).toHaveAttribute('type', 'password');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(toggle);
    await expect(input).toHaveAttribute('type', 'text');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByRole('status')).toHaveTextContent('Your password is shown!');

    await userEvent.click(toggle);
    await expect(input).toHaveAttribute('type', 'password');
    await expect(canvas.getByRole('status')).toHaveTextContent('Your password is hidden!');
    toggle.blur();
  },
};

/** Set disabled or readOnly to control whether the password can be edited. */
export const DisabledAndReadOnly: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => (
    <Flex direction="column" gap="400">
      <PasswordInput
        {...args}
        label="Disabled"
        disabled
        helperText="Please enter you username first"
      />
      <PasswordInput {...args} label="Read only" readOnly value="password123" />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/^Disabled/, { selector: 'input' });
    const [disabledToggle] = canvas.getAllByRole('button', {
      name: 'toggle password visibility',
    });

    await expect(disabledToggle).toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(disabledToggle!);
    await expect(input).toHaveAttribute('type', 'password');
    await expect(disabledToggle).toHaveAttribute('aria-pressed', 'false');
    disabledToggle!.blur();
  },
};

/** Set validationStatus and validationText to show valid or invalid feedback below the field. */
export const Validation: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Flex direction="column" gap="400">
      <PasswordInput
        {...args}
        label="Password"
        value="password123"
        validationStatus="valid"
        validationText="Strong password"
      />
      <PasswordInput
        {...args}
        label="Password"
        value="short"
        validationStatus="invalid"
        validationText="Please enter a password with at least 73 characters"
      />
    </Flex>
  ),
  args: { helperText: undefined },
};

/** PasswordInput works as a controlled input both inside and outside a form element. */
export const FormUsage: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => {
    const [value, setValue] = useState<string>('password123');
    return (
      <Flex direction="column" gap="400">
        <Flex gap="100" alignItems="end">
          <PasswordInput
            {...args}
            label="Not inside form"
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
          />
        </Flex>
        <Flex asChild gap="100" alignItems="end">
          <form
            onSubmit={event => {
              console.log({ value });
              event.preventDefault();
            }}
          >
            <PasswordInput
              {...args}
              label="Inside form"
              value={value}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
            />
          </form>
        </Flex>
      </Flex>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/^Inside form/, { selector: 'input' });
    const toggle = within(input.closest('form')!).getByRole('button', {
      name: 'toggle password visibility',
    });

    await userEvent.click(toggle);
    await expect(input).toHaveAttribute('type', 'text');

    await userEvent.type(input, '{Enter}');
    await expect(input).toHaveAttribute('type', 'password');
    input.blur();
  },
};
