import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components / Chip',
  component: Chip,
  argTypes: {
    children: { control: { type: 'text' } },
  },
  args: {
    children: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

/**
 * Visual matrix of Chip states — used in docs and Chromatic snapshot testing.
 * Not a usage reference; excluded from AI manifests via the !manifest tag.
 */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => (
    <Flex gap="200" wrap="wrap">
      <Chip>Default</Chip>
      <Chip disabled>Disabled</Chip>
    </Flex>
  ),
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  render: args => <Chip {...args} />,
};

/** Use onClick to remove the filter, attribute, or input the Chip represents. */
export const Removable: Story = {
  render: () => <Chip onClick={() => alert('Chip removed')}>Label</Chip>,
};

/** Set disabled to prevent the Chip from being removed. */
export const Disabled: Story = {
  render: () => <Chip disabled>Label</Chip>,
};
