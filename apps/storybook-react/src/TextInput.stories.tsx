import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BodyText,
  Card,
  Flex,
  Heading,
  TextInput,
  TextInputSlot,
} from '@utilitywarehouse/hearth-react';
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
    helperText: { control: { type: 'text' } },
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
    helperText: 'Helper text',
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
      <TextInput {...args} label="Disabled" disabled helperText="Please do something before this" />
      <TextInput
        {...args}
        label="Read only"
        readOnly
        value="Uneditable previously provided information"
      />
    </Flex>
  ),
  args: { helperText: undefined },
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
  args: { helperText: undefined },
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

export const GroupingInputs: Story = {
  render: () => (
    <Flex asChild direction="column">
      <fieldset>
        <legend>
          <Heading as="h3" size="lg" marginBottom="200">
            Grouping Inputs
          </Heading>
        </legend>
        <BodyText size="md" marginBottom="250" id="supporting-info">
          Supporting information
        </BodyText>
        <Card variant="subtle" direction="column" gap="250">
          <TextInput label="First name" required aria-describedby="supporting-info" />
          <TextInput label="Last name" required aria-describedby="supporting-info" />
          <TextInput
            label="Email"
            helperText="this is the helper text"
            aria-describedby="supporting-info"
          >
            <TextInputSlot placement="prefix">
              <EmailMediumIcon />
            </TextInputSlot>
          </TextInput>
        </Card>
      </fieldset>
    </Flex>
  ),
};
