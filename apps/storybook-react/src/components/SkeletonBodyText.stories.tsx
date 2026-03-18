import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Flex, SkeletonBodyText } from '@utilitywarehouse/hearth-react';

const sizes = ['sm', 'md', 'lg'] as const;

const meta: Meta<typeof SkeletonBodyText> = {
  title: 'Stories / SkeletonBodyText',
  component: SkeletonBodyText,
  decorators: [
    Story => (
      <Flex width="100%" padding="500" backgroundColor="secondary" justifyContent="center">
        <Story />
      </Flex>
    ),
  ],
  argTypes: {
    lines: { control: { type: 'text' } },
    size: { options: sizes, control: { type: 'radio' } },
  },
  args: {
    lines: '3',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonBodyText>;

export const Playground: Story = {
  render: args => (
    <Box width="360px">
      <SkeletonBodyText {...args} />
    </Box>
  ),
};

export const Sizes: Story = {
  render: args => (
    <Flex direction="column" gap="300" width="360px">
      {sizes.map(size => (
        <SkeletonBodyText key={size} {...args} size={size} lines="3" />
      ))}
    </Flex>
  ),
};

export const SingleLine: Story = {
  args: {
    lines: '1',
  },
  render: args => (
    <Box width="360px">
      <SkeletonBodyText {...args} />
    </Box>
  ),
};
