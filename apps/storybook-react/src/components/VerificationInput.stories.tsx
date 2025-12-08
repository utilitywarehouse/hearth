import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerificationInput, Flex } from '@utilitywarehouse/hearth-react';

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
    hideLabel: { control: { type: 'boolean' } },
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

export const DisabledAndReadOnly: Story = {
  render: args => (
    <Flex direction="column" gap="400">
      <VerificationInput
        {...args}
        label="Disabled"
        disabled
        helperText="Please do something before this"
      />
      <VerificationInput
        {...args}
        label="Read only"
        readOnly
        value="123456"
        helperText="Uneditable previously provided information"
      />
    </Flex>
  ),
  args: { helperText: undefined },
};

export const Validation: Story = {
  render: args => (
    <Flex direction="column" gap="400">
      <VerificationInput
        {...args}
        label="Label"
        value="123456"
        validationStatus="valid"
        validationText="Valid code"
        required
      />
      <VerificationInput
        {...args}
        label="Label"
        value="123456"
        validationStatus="invalid"
        validationText="Invalid code"
        required
      />
    </Flex>
  ),
  args: { helperText: undefined },
};
