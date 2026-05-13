import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Playground: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
};

export const Controlled: Story = {
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
};

export const PasswordType: Story = {
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
};
