import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';
import { Switch } from './Switch';

const sizes = ['sm', 'md'] as const;

const meta: Meta<typeof Switch> = {
  title: 'Components / Switch',
  component: Switch,
  argTypes: {
    size: { options: sizes, control: { type: 'radio' } },
    checked: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
  },
  args: {
    size: 'sm',
    disabled: false,
    label: 'Switch label',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/** Visual matrix of Switch sizes. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  render: args => (
    <Flex gap="400" direction="column">
      <Flex direction="row" gap="200">
        {sizes.map(size => (
          <Switch key={size} {...args} size={size} />
        ))}
      </Flex>
      <Flex direction="row" gap="200">
        <Switch {...args} disabled />
        <Switch {...args} disabled checked />
      </Flex>
    </Flex>
  ),
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('switch', { name: 'Switch label' });

    await expect(control).not.toBeChecked();

    await userEvent.click(control);
    await expect(control).toBeChecked();

    await userEvent.click(canvas.getByText('Switch label'));
    await expect(control).not.toBeChecked();
    control.blur();
  },
};

/** Set size to sm or md to change the Switch's dimensions. */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Flex direction="row" gap="200">
      {sizes.map(size => (
        <Switch key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

/** Set disabled to prevent the Switch from being toggled. */
export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  args: { disabled: true },
  render: args => (
    <Flex direction="row" gap="200">
      <Switch {...args} />
      <Switch {...args} checked />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const [unchecked] = within(canvasElement).getAllByRole('switch');

    await expect(unchecked).toHaveAttribute('aria-disabled', 'true');
    await expect(unchecked).not.toBeDisabled();

    await userEvent.click(unchecked!);
    await expect(unchecked).toHaveFocus();
    await expect(unchecked).not.toBeChecked();

    await userEvent.keyboard(' ');
    await expect(unchecked).not.toBeChecked();
    unchecked!.blur();
  },
};

const onDisabledClick = fn<() => void>();
const onDisabledCheckedChange = fn<(checked: boolean) => void>();

/** Test-only: a disabled Switch stays off and calls no handlers, even when given a callback ref. */
export const DisabledWithCallbackRef: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Switch
      label="Callback ref"
      disabled
      ref={() => {}}
      onClick={onDisabledClick}
      onCheckedChange={onDisabledCheckedChange}
    />
  ),
  play: async ({ canvasElement }) => {
    onDisabledClick.mockClear();
    onDisabledCheckedChange.mockClear();
    const control = within(canvasElement).getByRole('switch', { name: 'Callback ref' });

    await userEvent.click(control);
    await expect(control).not.toBeChecked();
    await expect(onDisabledClick).not.toHaveBeenCalled();
    await expect(onDisabledCheckedChange).not.toHaveBeenCalled();
    control.blur();
  },
};

/** Associate a Switch with visible label text via htmlFor, or pass aria-label when no visible label is present. */
export const AssociatedLabel: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { label: undefined, size: 'sm' },
  render: args => (
    <Flex direction="column" gap="600">
      <Flex direction="row" gap="200" alignItems="center">
        <BodyText as="label" htmlFor="airplane-mode">
          Airplane mode
        </BodyText>
        <Switch id="airplane-mode" {...args} />
      </Flex>
      <Switch aria-label="airplane-mode" {...args} />
    </Flex>
  ),
};

/** Pass a responsive object to size to change the Switch's dimensions per breakpoint. */
export const ResponsiveSize: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: {
    size: { mobile: 'sm', desktop: 'md' },
  },
};
