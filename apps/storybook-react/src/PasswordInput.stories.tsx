import type { Meta, StoryObj } from '@storybook/react';
import { Flex, PasswordInput } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof PasswordInput> = {
  title: 'Stories / PasswordInput',
  component: PasswordInput,
  parameters: {
    docs: {
      description: {
        component:
          '`PasswordInput` is an interactive field that is used to securely collect users passwords.',
      },
    },
  },
  argTypes: {
    placeholder: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    supportingText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    validationText: { control: { type: 'text' } },
  },
  args: {
    label: 'Password',
    disabled: false,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Playground: Story = {};

export const DisabledAndReadOnly: Story = {
  render: args => (
    <Flex direction="column" gap="400">
      <PasswordInput
        {...args}
        label="Disabled"
        disabled
        supportingText="Please enter you username first"
      />
      <PasswordInput {...args} label="Read only" readOnly value="password123" />
    </Flex>
  ),
  args: { supportingText: undefined },
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
  args: { supportingText: undefined },
};
