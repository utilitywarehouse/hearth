import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Playground: Story = {};

export const Sizes: Story = {
  render: args => (
    <Flex direction="row" gap="200">
      {sizes.map(size => (
        <Switch key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: args => (
    <Flex direction="row" gap="200">
      <Switch {...args} />
      <Switch {...args} checked />
    </Flex>
  ),
};

export const Labelled: Story = {
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

export const ResponsiveSize: Story = {
  args: {
    size: { mobile: 'sm', desktop: 'md' },
  },
};
