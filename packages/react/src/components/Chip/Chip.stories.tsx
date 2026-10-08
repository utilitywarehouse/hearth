import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
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
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
  },
  render: () => (
    <Flex gap="200" wrap="wrap">
      <Chip>Default</Chip>
      <Chip disabled>Disabled</Chip>
    </Flex>
  ),
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
  },
};

/** Use onClick to remove the filter, attribute, or input the Chip represents. */
export const Removable: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => <Chip onClick={() => alert('Chip removed')}>Label</Chip>,
};

/** Set disabled to prevent the Chip from being removed. */
export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => <Chip disabled>Label</Chip>,
};

/** Use ChipGroup to lay out multiple Chips, optionally introduced by a label. */
export const Group: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <ChipGroup label="Currently showing:">
      <Chip>Gas</Chip>
      <Chip>Electricity</Chip>
      <Chip>Broadband</Chip>
    </ChipGroup>
  ),
  play: async ({ canvasElement }) => {
    const group = within(canvasElement).getByRole('group', { name: 'Currently showing:' });

    await expect(
      within(group)
        .getAllByRole('button')
        .map(chip => chip.getAttribute('aria-label'))
    ).toEqual(['Remove Gas filter', 'Remove Electricity filter', 'Remove Broadband filter']);
  },
};

/** ChipGroup wraps its Chips onto multiple lines once they no longer fit the available width. */
export const Wrapping: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
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
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  tags: ['!manifest'],
  render: () => <AddAndRemoveExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Remove Gas filter' }));
    await expect(
      canvas.queryByRole('button', { name: 'Remove Gas filter' })
    ).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Add Gas' }));
    await expect(canvas.getByRole('button', { name: 'Remove Gas filter' })).toBeInTheDocument();
    (document.activeElement as HTMLElement | null)?.blur();
  },
};

const onChipClick = fn<(source: string) => void>();

/** Test-only: a disabled Chip doesn't call onClick, and aria-label overrides the default name. */
export const DisabledAndCustomLabel: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex gap="200">
      <Chip onClick={() => onChipClick('enabled')}>Enabled</Chip>
      <Chip disabled onClick={() => onChipClick('disabled')}>
        Disabled
      </Chip>
      <Chip aria-label="Clear the energy filter">Energy</Chip>
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    onChipClick.mockClear();
    const canvas = within(canvasElement);
    const disabled = canvas.getByRole('button', { name: 'Remove Disabled filter' });

    await expect(disabled).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(disabled);
    await userEvent.click(canvas.getByRole('button', { name: 'Remove Enabled filter' }));
    await expect(onChipClick).toHaveBeenCalledOnce();
    await expect(onChipClick).toHaveBeenCalledWith('enabled');

    await expect(
      canvas.getByRole('button', { name: 'Clear the energy filter' })
    ).toBeInTheDocument();
    (document.activeElement as HTMLElement | null)?.blur();
  },
};
