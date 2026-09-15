import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';
import { ChipGroup } from './ChipGroup';

const meta: Meta<typeof ChipGroup> = {
  title: 'Components / Chip / ChipGroup',
  component: ChipGroup,
  argTypes: {
    label: { control: { type: 'text' } },
  },
  args: {
    label: 'Currently showing:',
  },
};

export default meta;
type Story = StoryObj<typeof ChipGroup>;

/** Interactive sandbox — wrap Chips in ChipGroup, optionally introduced by a label. */
export const Playground: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <ChipGroup {...args}>
      <Chip>Gas</Chip>
      <Chip>Electricity</Chip>
      <Chip>Broadband</Chip>
    </ChipGroup>
  ),
};
