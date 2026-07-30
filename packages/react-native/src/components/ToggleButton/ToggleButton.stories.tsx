import { ToggleButton } from '.';
import { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Stories / ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      type: 'string',
      control: 'text',
      description: 'The text of the button.',
    },
    toggled: {
      type: 'boolean',
      control: 'boolean',
      description: 'Whether the button is toggled or not.',
    },
    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'If `true`, the button is disabled.',
    },
  },
  args: {
    text: 'Press me',
    toggled: false,
    disabled: false,
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ toggled: toggledArg = false, onToggle, ...args }) => {
    const [toggled, setToggled] = useState(toggledArg);
    useEffect(() => {
      setToggled(toggledArg);
    }, [toggledArg]);
    return <ToggleButton {...args} toggled={toggled} onToggle={setToggled} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: 'Press me' });

    // ToggleButton has no local toggle state of its own - `toggled` is a plain
    // prop and the visual "selected" style comes entirely from
    // `createButton()`'s internals reacting to it (see ToggleButtonRoot's
    // `toggled` variant). `react-native-web` does not map
    // `accessibilityState={{ selected }}` to an `aria-selected`/`aria-pressed`
    // DOM attribute here (verified via live DOM inspection - same gap as
    // Tab/SegmentedControlOption/Pill), so this asserts on the observable
    // background colour instead - see UWDS-4909.
    const unselectedBackground = getComputedStyle(button).backgroundColor;

    await userEvent.click(button);

    // This story wires `onToggle` to local state (mirroring the Playground
    // pattern used for other controlled-from-outside components, e.g.
    // Checkbox), so pressing does visibly flip the "selected" background here.
    await waitFor(() => {
      expect(getComputedStyle(button).backgroundColor).not.toBe(unselectedBackground);
    });
    const selectedBackground = getComputedStyle(button).backgroundColor;

    await userEvent.click(button);

    await waitFor(() => {
      expect(getComputedStyle(button).backgroundColor).toBe(unselectedBackground);
      expect(getComputedStyle(button).backgroundColor).not.toBe(selectedBackground);
    });
  },
};

const disabledOnToggle = fn();

export const Disabled: Story = {
  args: {
    text: 'Press me',
    toggled: false,
    disabled: true,
  },
  parameters: {
    controls: { exclude: ['toggled', 'disabled'] },
  },
  render: args => <ToggleButton {...args} onToggle={disabledOnToggle} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: 'Press me' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');

    const backgroundBefore = getComputedStyle(button).backgroundColor;

    await userEvent.click(button);

    // A disabled ToggleButton does not respond to press - its `onToggle`
    // callback is never invoked and its background stays unchanged.
    expect(disabledOnToggle).not.toHaveBeenCalled();
    expect(getComputedStyle(button).backgroundColor).toBe(backgroundBefore);
  },
};
