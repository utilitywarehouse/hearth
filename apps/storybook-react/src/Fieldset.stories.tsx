import type { Meta, StoryObj } from '@storybook/react';
import { Fieldset, Legend, Flex, Heading, TextInput } from '@utilitywarehouse/hearth-react';
import { Placeholder } from './storybook-components/Placeholder';

const meta: Meta<typeof Fieldset> = {
  title: 'Stories / Fieldset',
  component: Fieldset,
  parameters: {
    docs: {
      description: {
        component:
          'The `Fieldset` component should be used to group related form inputs, and handles layout, labelling, helper and validation text.',
      },
    },
  },
  argTypes: {
    helperText: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: ['valid', 'invalid', undefined] },
    label: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    label: 'Label',
    disabled: false,
    helperText: 'Helper text',
    validationText: 'Validation text',
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Playground: Story = {
  render: args => {
    return (
      <Fieldset {...args}>
        <Placeholder height="100px" width="300px" />
      </Fieldset>
    );
  },
};

export const CustomLabel: Story = {
  render: args => {
    return (
      <Flex direction="column" gap="800">
        <Fieldset {...args} label={<Heading as="h2">Personal details</Heading>}>
          <TextInput label="First name" required />
          <TextInput label="Middle name(s)" />
          <TextInput label="Last name" required />
        </Fieldset>
        <Flex direction="column" gap="300">
          <Heading as="h2" id="personal-details">
            Personal details
          </Heading>
          <Fieldset {...args} aria-labelledby="personal-details">
            <TextInput label="First name" required />
            <TextInput label="Middle name(s)" />
            <TextInput label="Last name" required />
          </Fieldset>
        </Flex>
      </Flex>
    );
  },
  args: {
    label: undefined,
    helperText: undefined,
    validationText: undefined,
  },
};
