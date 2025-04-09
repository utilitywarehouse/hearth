import type { Meta, StoryObj } from '@storybook/react';
import { Fieldset, FieldsetLegend } from '@utilitywarehouse/hearth-react';
import { Placeholder } from './storybook-components/Placeholder';

const meta: Meta<typeof Fieldset> = {
  title: 'Stories / Fieldset',
  component: Fieldset,
  parameters: {
    docs: {
      description: {
        component:
          'The `Fieldset` component should be used to group related form inputs, and should be used with the `FieldsetLegend` component.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Workshop: Story = {
  render: args => {
    return (
      <Fieldset {...args}>
        <FieldsetLegend>Fieldset legend</FieldsetLegend>
        <Placeholder height="100px" width="300px" />
      </Fieldset>
    );
  },
};
