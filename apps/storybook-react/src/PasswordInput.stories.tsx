import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof PasswordInput> = {
  title: 'Stories / PasswordInput',
  component: PasswordInput,
  argTypes: {
    placeholder: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    supportingText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
  },
  args: {
    label: 'Password',
    supportingText: 'Supporting text',
    validationText: 'Validation text',
    disabled: false,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Playground: Story = {};
