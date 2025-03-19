import type { Meta, StoryObj } from '@storybook/react';
import { BodyText, Flex, TextInput, TextInputSlot } from '@utilitywarehouse/hearth-react';
import { EmailMediumIcon } from '@utilitywarehouse/react-icons';

const meta: Meta<typeof TextInput> = {
  title: 'Stories / TextInput',
  component: TextInput,
  argTypes: {
    placeholder: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    supportingText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
  },
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    supportingText: 'Supporting text',
    disabled: false,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Playground: Story = {};

export const PrefixAndSuffix: Story = {
  render: args => (
    <Flex direction="column" gap="400">
      <TextInput {...args}>
        <TextInputSlot placement="prefix">
          <BodyText size="md" weight="semibold">
            £
          </BodyText>
        </TextInputSlot>
      </TextInput>
      <TextInput {...args}>
        <TextInputSlot placement="suffix">
          <BodyText size="md" weight="semibold">
            kWh
          </BodyText>
        </TextInputSlot>
      </TextInput>
    </Flex>
  ),
};

export const WithIcons: Story = {
  render: args => (
    <TextInput {...args}>
      <TextInputSlot placement="prefix">
        <EmailMediumIcon />
      </TextInputSlot>
    </TextInput>
  ),
};
