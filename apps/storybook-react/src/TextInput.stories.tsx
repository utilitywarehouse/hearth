import type { Meta, StoryObj } from '@storybook/react';
import { TextInput, TextInputSlot } from '@utilitywarehouse/hearth-react';
import { EmailMediumIcon } from '@utilitywarehouse/react-icons';

const meta: Meta<typeof TextInput> = {
  title: 'Stories / TextInput',
  component: TextInput,
  argTypes: {
    placeholder: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
  },
  args: {
    placeholder: 'Placeholder',
    disabled: false,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Playground: Story = {};

export const WithIcons: Story = {
  render: () => (
    <TextInput>
      <TextInputSlot placement="prefix">
        <EmailMediumIcon />
      </TextInputSlot>
    </TextInput>
  ),
};
