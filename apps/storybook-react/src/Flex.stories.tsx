import type { Meta, StoryObj } from '@storybook/react';
import { Box, colorTokens, Flex, spaceTokens } from '@utilitywarehouse/hearth-react';

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
    color: { options: colorTokens, control: { type: 'select' } },
    backgroundColor: { control: { type: 'text' } },
    padding: { options: spaceTokens, control: { type: 'select' } },
    paddingInline: { options: spaceTokens, control: { type: 'select' } },
    paddingBlock: { options: spaceTokens, control: { type: 'select' } },
    paddingTop: { options: spaceTokens, control: { type: 'select' } },
    paddingRight: { options: spaceTokens, control: { type: 'select' } },
    paddingBottom: { options: spaceTokens, control: { type: 'select' } },
    paddingLeft: { options: spaceTokens, control: { type: 'select' } },
    gap: { options: spaceTokens, control: { type: 'select' } },
    spacing: { options: ['xs', 'sm', 'md', 'lg', 'xl'], control: { type: 'select' } },
    width: { control: { type: 'text' } },
    minWidth: { control: { type: 'text' } },
    maxWidth: { control: { type: 'text' } },
    height: { control: { type: 'text' } },
    minHeight: { control: { type: 'text' } },
    maxHeight: { control: { type: 'text' } },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof Flex>;

export const Playground: Story = {
  render: args => (
    <Flex {...args}>
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
    </Flex>
  ),
  args: {
    gap: '200',
  },
};

export const ResponsiveGap: Story = {
  render: args => (
    <Flex {...args}>
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
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
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
    </Flex>
  ),
  args: {
    spacing: 'lg',
    direction: 'column',
  },
};
