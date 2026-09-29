import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Chip } from './Chip';
import { ChipGroup } from './ChipGroup';

const meta = {
  title: 'Stories / Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Label',
    disabled: false,
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    controls: { include: ['children', 'disabled'] },
  },
};

/** Use `onPress` to remove the filter, attribute, or input the Chip represents. */
export const Removable: Story = {
  args: {
    onPress: fn(),
  },
  parameters: {
    controls: { disable: true },
    // Logging the press event to the actions panel throws on web, as it walks
    // into Reanimated's native-only getters.
    actions: { disable: true },
  },
  render: args => <Chip onPress={args.onPress}>Label</Chip>,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('button', { name: 'Remove Label filter' });

    await expect(chip).toHaveTextContent('Label');
    await userEvent.click(chip);
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

/** Set `disabled` to prevent the Chip from being removed. */
export const Disabled: Story = {
  args: {
    onPress: fn(),
  },
  parameters: {
    controls: { disable: true },
  },
  render: args => (
    <Chip disabled onPress={args.onPress}>
      Label
    </Chip>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('button', { name: 'Remove Label filter' });

    await expect(chip).toHaveAttribute('aria-disabled', 'true');
    // react-native-web sets `pointer-events: none` on disabled Pressables, so
    // skip userEvent's guard to prove the press is still ignored.
    await userEvent.click(chip, { pointerEventsCheck: 0 });
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};

/** Pass `aria-label` to override the default `Remove [label] filter` accessible name. */
export const CustomAccessibleName: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <Chip aria-label="Clear gas from your search">Gas</Chip>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('button', { name: 'Clear gas from your search' })
    ).toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: 'Remove Gas filter' })).toBeNull();
  },
};

/** Use `ChipGroup` to lay out multiple Chips, optionally introduced by a label. */
export const Group: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <ChipGroup label="Currently showing:">
      <Chip>Gas</Chip>
      <Chip>Electricity</Chip>
      <Chip>Broadband</Chip>
    </ChipGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', { name: 'Currently showing:' });

    await expect(within(group).getAllByRole('button')).toHaveLength(3);
  },
};

/** `ChipGroup` wraps its Chips onto multiple lines once they no longer fit the available width. */
export const Wrapping: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <Box maxWidth={360}>
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
    <Flex direction="column" spacing="md">
      {selected.length > 0 ? (
        <ChipGroup label="Currently showing:">
          {selected.map(service => (
            <Chip
              key={service}
              onPress={() => setSelected(prev => prev.filter(s => s !== service))}
            >
              {service}
            </Chip>
          ))}
        </ChipGroup>
      ) : null}
      <Flex direction="row" spacing="sm" wrap="wrap">
        {available.map(service => (
          <Button
            key={service}
            colorScheme="functional"
            size="sm"
            variant="outline"
            onPress={() => setSelected(prev => [...prev, service])}
          >
            {`Add ${service}`}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

/**
 * Press a Chip to remove it from the group, or use the buttons below to add
 * one back. Demonstrates a typical filter-list pattern where `ChipGroup`
 * reflects state that's added to and removed from over time.
 */
export const AddAndRemove: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <AddAndRemoveExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Remove Gas filter' }));
    await expect(canvas.queryByRole('button', { name: 'Remove Gas filter' })).toBeNull();
    await expect(canvas.getByRole('button', { name: 'Remove Electricity filter' })).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Add Gas' }));
    await expect(canvas.getByRole('button', { name: 'Remove Gas filter' })).toBeVisible();
  },
};
