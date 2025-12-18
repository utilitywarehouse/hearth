import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex, spaceTokens, colorValues, borderColorValues } from '@utilitywarehouse/hearth-react';
import { Placeholder } from '../storybook-components/Placeholder';

const backgroundColorValues = ['primary', 'secondary', 'brand'] as const;
const borderStyleValues = ['none', 'solid'] as const;
const borderWidthValues = ['0', '1', '2'] as const;
const borderRadiusValues = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;

const meta: Meta<typeof Flex> = {
  title: 'Stories / Flex',
  component: Flex,
  parameters: {
    docs: {
      description: {
        component:
          '`Flex` is a fundamental primitive, and should be used for CSS flexbox based layouts.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    as: { options: ['div', 'span'], control: { type: 'radio' } },
    display: { options: ['none', 'flex', 'inline-flex'], control: { type: 'radio' } },
    color: { options: colorValues, control: { type: 'select' } },
    backgroundColor: { options: backgroundColorValues, control: { type: 'select' } },
    padding: { options: spaceTokens, control: { type: 'select' } },
    paddingX: { options: spaceTokens, control: { type: 'select' } },
    paddingY: { options: spaceTokens, control: { type: 'select' } },

    paddingTop: { options: spaceTokens, control: { type: 'select' } },
    paddingRight: { options: spaceTokens, control: { type: 'select' } },
    paddingBottom: { options: spaceTokens, control: { type: 'select' } },
    paddingLeft: { options: spaceTokens, control: { type: 'select' } },
    wrap: { control: { type: 'radio' }, options: ['nowrap', 'wrap', 'wrap-reverse'] },
    gap: { options: spaceTokens, control: { type: 'select' } },
    spacing: {
      options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
    width: { control: { type: 'text' } },
    minWidth: { control: { type: 'text' } },
    maxWidth: { control: { type: 'text' } },
    height: { control: { type: 'text' } },
    minHeight: { control: { type: 'text' } },
    maxHeight: { control: { type: 'text' } },
    borderColor: { options: borderColorValues, control: { type: 'select' } },
    borderStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderTopColor: { options: borderColorValues, control: { type: 'select' } },
    borderTopStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderTopWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderRightColor: { options: borderColorValues, control: { type: 'select' } },
    borderRightStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderRightWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderBottomColor: { options: borderColorValues, control: { type: 'select' } },
    borderBottomStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderBottomWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderLeftColor: { options: borderColorValues, control: { type: 'select' } },
    borderLeftStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderLeftWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderRadius: { options: borderRadiusValues, control: { type: 'select' } },
    borderRadiusTopLeftNone: { control: 'boolean' },
    borderRadiusTopRightNone: { control: 'boolean' },
    borderRadiusBottomLeftNone: { control: 'boolean' },
    borderRadiusBottomRightNone: { control: 'boolean' },
    borderRadiusTopNone: { control: 'boolean' },
    borderRadiusRightNone: { control: 'boolean' },
    borderRadiusBottomNone: { control: 'boolean' },
    borderRadiusLeftNone: { control: 'boolean' },
    position: {
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      control: { type: 'select' },
    },
    inset: { control: { type: 'number' } },
    top: { control: { type: 'number' } },
    right: { control: { type: 'number' } },
    bottom: { control: { type: 'number' } },
    left: { control: { type: 'number' } },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof Flex>;

export const Playground: Story = {
  render: args => (
    <Flex {...args}>
      <Placeholder padding="600" />
      <Placeholder padding="600" />
      <Placeholder padding="600" />
      <Placeholder padding="600" />
    </Flex>
  ),
  args: {
    gap: '200',
  },
};

export const ResponsiveGap: Story = {
  render: args => (
    <Flex {...args}>
      <Placeholder padding="600" />
      <Placeholder padding="600" />
      <Placeholder padding="600" />
    </Flex>
  ),
  args: {
    gap: {
      mobile: '200',
      tablet: '100',
      desktop: '300',
      wide: '600',
    },
    direction: 'column',
  },
};

export const Spacing: Story = {
  render: args => (
    <Flex {...args}>
      <Placeholder padding="600" />
      <Placeholder padding="600" />
      <Placeholder padding="600" />
    </Flex>
  ),
  args: {
    spacing: 'lg',
    direction: 'column',
  },
};
