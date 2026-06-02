import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Playground: Story = {
  render: args => <PasswordInput {...args} />,
};

export const DisabledAndReadOnly: Story = {
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
};

export const Validation: Story = {
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

export const FormUsage: Story = {
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
};
