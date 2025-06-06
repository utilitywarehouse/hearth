import type { Meta, StoryObj } from '@storybook/react';
import { Legend, Heading } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Legend> = {
  title: 'Stories / Legend',
  component: Legend,
  argTypes: {
    children: { control: { type: 'text' } },
  },
  args: {
    children: 'Fieldset legend',
  },
};

export default meta;
type Story = StoryObj<typeof Legend>;

export const Playground: Story = {};

export const CustomElement: Story = {
  render: () => (
    <Legend>
      <Heading as="h1">Custom label</Heading>
    </Legend>
  ),
};
