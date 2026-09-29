import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Chip } from './Chip';
import { ChipGroup } from './ChipGroup';

const meta = {
  title: 'Stories / ChipGroup',
  component: ChipGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: 'Currently showing:',
    children: <></>,
  },
} satisfies Meta<typeof ChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    controls: { include: ['label'] },
  },
  render: args => (
    <ChipGroup {...args}>
      <Chip>Gas</Chip>
      <Chip>Electricity</Chip>
      <Chip>Broadband</Chip>
    </ChipGroup>
  ),
};

/** Without a `label`, pass `aria-label` to give the group an accessible name. */
export const WithoutLabel: Story = {
  args: {
    label: undefined,
    'aria-label': 'Active filters',
  },
  parameters: {
    controls: { disable: true },
  },
  render: args => (
    <ChipGroup {...args}>
      <Chip>Gas</Chip>
      <Chip>Electricity</Chip>
    </ChipGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', { name: 'Active filters' });

    await expect(group).not.toHaveAttribute('aria-labelledby');
    await expect(canvas.queryByText('Currently showing:')).toBeNull();
  },
};
