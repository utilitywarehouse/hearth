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

export const KeyboardNavigation: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <ToggleGroup type="single" defaultValue="week" gap="200">
      <ToggleButton value="day" text="Day" />
      <ToggleButton value="week" text="Week" />
      <ToggleButton value="month" text="Month" disabled />
      <ToggleButton value="year" text="Year" />
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const day = canvas.getByRole('radio', { name: 'Day' });
    const week = canvas.getByRole('radio', { name: 'Week' });
    const year = canvas.getByRole('radio', { name: 'Year' });

    // The group is one Tab stop: focus arriving on it (e.g. by Tab) moves to the selected
    // item. Focusing the group directly keeps this independent of the page's Tab order.
    const group = canvas.getByRole('radiogroup');
    await expect(group).toHaveAttribute('tabindex', '0');
    group.focus();
    await expect(week).toHaveFocus();
    await expect(group).toHaveAttribute('tabindex', '-1');
    await expect(day).toHaveAttribute('tabindex', '-1');
    await expect(year).toHaveAttribute('tabindex', '-1');

    // Arrow keys move focus but not selection, skip disabled items and wrap.
    await userEvent.keyboard('{ArrowRight}');
    await expect(year).toHaveFocus();
    await expect(week).toHaveAttribute('aria-checked', 'true');
    await userEvent.keyboard('{ArrowRight}');
    await expect(day).toHaveFocus();
    await userEvent.keyboard('{ArrowLeft}');
    await expect(year).toHaveFocus();
    await userEvent.keyboard('{Home}');
    await expect(day).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(year).toHaveFocus();

    // Space selects the focused item, and the focused item becomes the Tab stop.
    await userEvent.keyboard(' ');
    await expect(year).toHaveAttribute('aria-checked', 'true');
    await expect(week).toHaveAttribute('aria-checked', 'false');
    await expect(year).toHaveAttribute('tabindex', '0');

    // Tab leaves the group rather than visiting another item.
    await userEvent.tab();
    await expect([day, week, year, group]).not.toContain(document.activeElement);
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
