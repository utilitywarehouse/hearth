import type { Meta, StoryObj } from '@storybook/react';
import { FieldsetLegend } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof FieldsetLegend> = {
  title: 'Stories / FieldsetLegend',
  component: FieldsetLegend,
  parameters: {
    docs: {
      description: {
        component:
          'The `FieldsetLegend` should be used with the `Fieldset` component to label grouped form inputs.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
  },
  args: {
    children: 'Hearth fieldset legend',
  },
};

export default meta;
type Story = StoryObj<typeof FieldsetLegend>;

export const Playground: Story = {};
