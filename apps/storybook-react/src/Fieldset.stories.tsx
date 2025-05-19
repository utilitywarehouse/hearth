import type { Meta, StoryObj } from '@storybook/react';
import { Fieldset, FieldsetLegend, Flex, Heading, TextInput } from '@utilitywarehouse/hearth-react';
import { Placeholder } from './storybook-components/Placeholder';

const meta: Meta<typeof Fieldset> = {
  title: 'Stories / Fieldset',
  component: Fieldset,
  parameters: {
    docs: {
      description: {
        component:
          'The `Fieldset` component can be used to group related form inputs, and should be used with the `FieldsetLegend` component.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Playground: Story = {
  render: args => {
    return (
      <Fieldset {...args}>
        <FieldsetLegend>Fieldset legend</FieldsetLegend>
        <Placeholder height="100px" width="300px" />
      </Fieldset>
    );
  },
};

export const GroupingInputs: Story = {
  render: args => {
    return (
      <Fieldset {...args}>
        <FieldsetLegend marginBottom="200">
          <Heading as="h2">Personal details</Heading>
        </FieldsetLegend>
        <Flex direction="column" gap="200">
          <TextInput label="First name" required />
          <TextInput label="Middle name(s)" />
          <TextInput label="Last name" required />
        </Flex>
      </Fieldset>
    );
  },
};
