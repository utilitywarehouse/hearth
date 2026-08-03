import { ToggleButton } from '.';
import { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

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

const playgroundOnToggle = fn();

export const Playground: Story = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ toggled: toggledArg = false, onToggle, ...args }) => {
    const [toggled, setToggled] = useState(toggledArg);
    useEffect(() => {
      setToggled(toggledArg);
    }, [toggledArg]);
    return (
      <ToggleButton
        {...args}
        toggled={toggled}
        onToggle={value => {
          setToggled(value);
          playgroundOnToggle(value);
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: 'Press me' });

    // ToggleButton has no local toggle state of its own - `toggled` is a plain
    // controlled prop, and pressing calls `onToggle` with the flipped value.
    // `react-native-web` does not map `accessibilityState={{ selected }}` to
    // an `aria-selected`/`aria-pressed` DOM attribute here (verified via live
    // DOM inspection - same gap as Tab/SegmentedControlOption/Pill, see
    // UWDS-4909), and the Unistyles-variant-driven background colour change
    // isn't reliably observable via `getComputedStyle` in every test
    // environment either, so this characterizes the `onToggle` callback
    // contract instead of the rendered style.
    await userEvent.click(button);
    expect(playgroundOnToggle).toHaveBeenLastCalledWith(true);

    await userEvent.click(button);
    expect(playgroundOnToggle).toHaveBeenLastCalledWith(false);
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

    // A disabled ToggleButton renders with `pointer-events: none` - a real user
    // cannot click it at all, so its disabled state is the characterization
    // itself, not a click attempt (userEvent.click throws on a pointer-events:
    // none element, which is itself proof it can't respond).
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(disabledOnToggle).not.toHaveBeenCalled();
  },
};
