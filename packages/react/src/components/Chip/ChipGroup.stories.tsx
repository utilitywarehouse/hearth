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

export const Playground: Story = {
  render: args => (
    <ChipGroup {...args}>
      <Chip>Gas</Chip>
      <Chip>Electricity</Chip>
      <Chip>Broadband</Chip>
    </ChipGroup>
  ),
};
