import type { Meta, StoryObj } from '@storybook/react';
import { FieldsetLegend, Heading } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof FieldsetLegend> = {
  title: 'Stories / FieldsetLegend',
  component: FieldsetLegend,
  argTypes: {
    children: { control: { type: 'text' } },
  },
  args: {
    children: 'Fieldset legend',
  },
};

export default meta;
type Story = StoryObj<typeof FieldsetLegend>;

export const Playground: Story = {};

export const CustomElement: Story = {
  render: () => (
    <FieldsetLegend>
      <Heading as="h1">Custom label</Heading>
    </FieldsetLegend>
  ),
};
