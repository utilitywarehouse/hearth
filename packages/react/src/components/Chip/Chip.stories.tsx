import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Chip } from './Chip';
import { ChipGroup } from './ChipGroup';

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

/** Use ChipGroup to lay out multiple Chips, optionally introduced by a label. */
export const Group: Story = {
  render: () => (
    <ChipGroup label="Currently showing:">
      <Chip>Gas</Chip>
      <Chip>Electricity</Chip>
      <Chip>Broadband</Chip>
    </ChipGroup>
  ),
};

/** ChipGroup wraps its Chips onto multiple lines once they no longer fit the available width. */
export const Wrapping: Story = {
  render: () => (
    <Box maxWidth="600px">
      <ChipGroup label="Currently showing:">
        <Chip>Gas</Chip>
        <Chip>Electricity</Chip>
        <Chip>Mobile</Chip>
        <Chip>Broadband</Chip>
        <Chip>Insurance</Chip>
        <Chip>Cashback</Chip>
      </ChipGroup>
    </Box>
  ),
};

const services = ['Gas', 'Electricity', 'Mobile', 'Broadband', 'Insurance', 'Cashback'];

const AddAndRemoveExample = () => {
  const [selected, setSelected] = useState<Array<string>>(['Gas', 'Electricity']);
  const available = services.filter(service => !selected.includes(service));

  return (
    <Flex direction="column" gap="200">
      {selected.length > 0 ? (
        <ChipGroup label="Currently showing:">
          {selected.map(service => (
            <Chip
              key={service}
              onClick={() => setSelected(prev => prev.filter(s => s !== service))}
            >
              {service}
            </Chip>
          ))}
        </ChipGroup>
      ) : null}
      <Flex gap="100" wrap="wrap">
        {available.map(service => (
          <Button
            key={service}
            size="sm"
            variant="outline"
            onClick={() => setSelected(prev => [...prev, service])}
          >
            Add {service}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

/**
 * Click a Chip to remove it from the group, or use the buttons below to add
 * one back. Demonstrates a typical filter-list pattern where ChipGroup
 * reflects state that's added to and removed from over time.
 */
export const AddAndRemove: Story = {
  tags: ['!manifest'],
  render: () => <AddAndRemoveExample />,
};
