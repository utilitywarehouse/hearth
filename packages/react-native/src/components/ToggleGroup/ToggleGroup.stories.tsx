import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ToggleGroup } from '.';
import { BodyText } from '../BodyText';
import { Flex } from '../Flex';
import { ToggleButton } from '../ToggleButton';
import { ToggleButtonCard } from '../ToggleButtonCard';

const meta = {
  title: 'Stories / ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Whether one or any number of items can be selected.',
    },
  },
  args: {
    type: 'multiple',
    gap: '200',
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const playgroundOnValueChange = fn();

export const Playground: Story = {
  parameters: {
    controls: { exclude: ['value', 'defaultValue', 'onValueChange', 'children'] },
  },
  render: args => (
    // Remount when `type` changes, as the uncontrolled value has a different shape per type.
    <ToggleGroup key={args.type} {...args} onValueChange={playgroundOnValueChange}>
      <ToggleButton value="one" text="Label" />
      <ToggleButton value="two" text="Label" />
      <ToggleButton value="three" text="Label" />
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // `type="multiple"`: a group of pressed/unpressed toggle buttons.
    await expect(canvas.getByRole('group')).toBeInTheDocument();
    const [first, second] = canvas.getAllByRole('button', { name: 'Label' });
    await expect(first).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(first);
    await expect(first).toHaveAttribute('aria-pressed', 'true');
    await expect(playgroundOnValueChange).toHaveBeenLastCalledWith(['one']);

    await userEvent.click(second);
    await expect(first).toHaveAttribute('aria-pressed', 'true');
    await expect(second).toHaveAttribute('aria-pressed', 'true');
    await expect(playgroundOnValueChange).toHaveBeenLastCalledWith(['one', 'two']);

    await userEvent.click(first);
    await expect(first).toHaveAttribute('aria-pressed', 'false');
    await expect(playgroundOnValueChange).toHaveBeenLastCalledWith(['two']);
  },
};

const singleOnValueChange = fn();

export const Single: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <ToggleGroup type="single" defaultValue="monthly" onValueChange={singleOnValueChange} gap="200">
      <ToggleButton value="monthly" text="Monthly" />
      <ToggleButton value="annually" text="Annually" />
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // `type="single"`: a radio group, with `defaultValue` selected on first render.
    await expect(canvas.getByRole('radiogroup')).toBeInTheDocument();
    const monthly = canvas.getByRole('radio', { name: 'Monthly' });
    const annually = canvas.getByRole('radio', { name: 'Annually' });
    await expect(monthly).toHaveAttribute('aria-checked', 'true');
    await expect(annually).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(annually);
    await expect(annually).toHaveAttribute('aria-checked', 'true');
    await expect(monthly).toHaveAttribute('aria-checked', 'false');
    await expect(singleOnValueChange).toHaveBeenLastCalledWith('annually');

    // Pressing the selected item again clears the value, matching the React package.
    await userEvent.click(annually);
    await expect(annually).toHaveAttribute('aria-checked', 'false');
    await expect(singleOnValueChange).toHaveBeenLastCalledWith('');
  },
};

export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [value, setValue] = useState<string[]>(['energy']);
    return (
      <Flex spacing="md" align="center">
        <ToggleGroup value={value} onValueChange={setValue} gap="200">
          <ToggleButton value="energy" text="Energy" />
          <ToggleButton value="broadband" text="Broadband" />
          <ToggleButton value="mobile" text="Mobile" />
        </ToggleGroup>
        <BodyText>Selected: {value.join(', ') || 'none'}</BodyText>
      </Flex>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Selected: energy')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Mobile' }));
    await expect(canvas.getByText('Selected: energy, mobile')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Energy' }));
    await expect(canvas.getByText('Selected: mobile')).toBeInTheDocument();
  },
};

const disabledOnValueChange = fn();

export const DisabledItem: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <ToggleGroup onValueChange={disabledOnValueChange} gap="200">
      <ToggleButton value="one" text="Available" />
      <ToggleButton value="two" text="Unavailable" disabled />
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabled = canvas.getByRole('button', { name: 'Unavailable' });

    await expect(disabled).toBeDisabled();
    await userEvent.click(disabled, { pointerEventsCheck: 0 });
    await expect(disabled).toHaveAttribute('aria-pressed', 'false');
    await expect(disabledOnValueChange).not.toHaveBeenCalled();
  },
};

const cardsOnValueChange = fn();

export const WithToggleButtonCards: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <ToggleGroup
      type="single"
      defaultValue="standard"
      onValueChange={cardsOnValueChange}
      direction="column"
      gap="200"
      width={320}
    >
      <ToggleButtonCard value="standard" label="Choose Standard">
        <BodyText weight="semibold">Standard tariff</BodyText>
        <BodyText>Prices can change.</BodyText>
      </ToggleButtonCard>
      <ToggleButtonCard value="fixed" label="Choose Fixed">
        <BodyText weight="semibold">Fixed tariff</BodyText>
        <BodyText>Prices stay the same for 12 months.</BodyText>
      </ToggleButtonCard>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const standard = canvas.getByRole('radio', { name: 'Choose Standard' });
    const fixed = canvas.getByRole('radio', { name: 'Choose Fixed' });
    await expect(standard).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(fixed);
    await expect(fixed).toHaveAttribute('aria-checked', 'true');
    await expect(standard).toHaveAttribute('aria-checked', 'false');
    await expect(cardsOnValueChange).toHaveBeenLastCalledWith('fixed');
  },
};
