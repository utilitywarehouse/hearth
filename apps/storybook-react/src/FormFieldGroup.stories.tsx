import type { Meta, StoryObj } from '@storybook/react';

import { FormFieldGroup } from '@utilitywarehouse/hearth-react';
import { Placeholder } from './storybook-components/Placeholder';

const meta: Meta<typeof FormFieldGroup> = {
  title: 'Stories / FormFieldGroup',
  component: FormFieldGroup,
  parameters: {
    docs: {
      description: {
        component:
          'The `FormFieldGroup` component can be used to group related form inputs, it builds on the `Fieldset` component, and handles layout, labelling, helper and validation text.',
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
type Story = StoryObj<typeof FormFieldGroup>;

export const Playground: Story = {
  render: args => {
    return (
      <FormFieldGroup {...args}>
        <Placeholder height="100px" width="300px" />
      </FormFieldGroup>
    );
  },
};
