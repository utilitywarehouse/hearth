import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerificationInput, Flex } from '@utilitywarehouse/hearth-react';
import React from 'react';

const meta: Meta<typeof VerificationInput> = {
  title: 'Stories / VerificationInput',
  component: VerificationInput,
  parameters: {
    docs: {
      description: {
        component:
          '`VerificationInput` allows users to enter a one-time password (OTP) sent via SMS, email, or authenticator apps.',
      },
    },
  },
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

export const Playground: Story = {};

export const Controlled: Story = {
  render: args => {
    const [value, setValue] = React.useState('');
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
};

export const PasswordType: Story = {
  render: args => {
    const [value, setValue] = React.useState<string | undefined>();
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
};
