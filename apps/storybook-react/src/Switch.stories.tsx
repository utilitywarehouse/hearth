import type { Meta, StoryObj } from '@storybook/react';
import { Flex, Switch } from '@utilitywarehouse/hearth-react';

const sizes = ['sm', 'md'] as const;

const meta: Meta<typeof Switch> = {
  title: 'Stories / Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          '`Switch` is used to indicate switching between two opposing options. Switches allow users to turn an individual option on or off. They are usually used to activate or deactivate a specific setting.',
      },
    },
  },
  argTypes: {
    size: { options: sizes, control: { type: 'radio' } },
    checked: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    size: 'md',
    disabled: false,
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
  render: args => (
    <Flex direction="row" gap="200">
      <Switch {...args} />
      <Switch {...args} checked />
    </Flex>
  ),
  args: {
    disabled: true,
  },
};

export const ResponsiveSize: Story = {
  args: {
    size: { mobile: 'sm', desktop: 'md' },
  },
};
