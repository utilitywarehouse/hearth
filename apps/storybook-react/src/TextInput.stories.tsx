import type { Meta, StoryObj } from '@storybook/react';
import { BodyText, Flex, TextInput, TextInputSlot } from '@utilitywarehouse/hearth-react';
import { EmailMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof TextInput> = {
  title: 'Stories / TextInput',
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component: '`TextInput` is an interactive field that allows users to enter text and data.',
      },
    },
  },
  argTypes: {
    placeholder: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    supportingText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    hideLabel: { control: { type: 'boolean' } },
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
    validationText: 'Validation text',
    disabled: false,
    readOnly: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Playground: Story = {};

export const DisabledAndReadOnly: Story = {
  render: args => (
    <Flex direction="column" gap="400">
      <TextInput
        {...args}
        label="Disabled"
        disabled
        supportingText="Please do something before this"
      />
      <TextInput
        {...args}
        label="Read only"
        readOnly
        value="Uneditable previously provided information"
      />
    </Flex>
  ),
  args: { supportingText: undefined },
};

export const Validation: Story = {
  render: args => (
    <Flex direction="column" gap="400">
      <TextInput
        {...args}
        label="Email"
        type="email"
        value="rphoenix@uw.co.uk"
        validationStatus="valid"
        validationText="Valid email address"
        required
      />
      <TextInput
        {...args}
        label="Email"
        type="email"
        value="rphoenix@geemail."
        validationStatus="invalid"
        validationText="Please enter a valid email address"
        required
      />
    </Flex>
  ),
  args: { supportingText: undefined },
};

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
