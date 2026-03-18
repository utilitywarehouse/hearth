import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Flex, SkeletonHeading } from '@utilitywarehouse/hearth-react';

const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

const meta: Meta<typeof SkeletonHeading> = {
  title: 'Stories / SkeletonHeading',
  component: SkeletonHeading,
  decorators: [
    Story => (
      <Flex width="100%" padding="500" backgroundColor="secondary" justifyContent="center">
        <Story />
      </Flex>
    ),
  ],
  argTypes: {
    size: { options: sizes, control: { type: 'radio' } },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonHeading>;

export const Playground: Story = {
  render: args => (
    <Box width="360px">
      <SkeletonHeading {...args} />
    </Box>
  ),
};

export const Sizes: Story = {
  render: args => (
    <Flex direction="column" gap="200" width="360px">
      {sizes.map(size => (
        <SkeletonHeading key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

export const ContentBlock: Story = {
  render: args => (
    <Flex direction="column" gap="300" width="420px">
      <SkeletonHeading {...args} size="lg" />
      <Box width="100%">
        <Flex direction="column" gap="150">
          <SkeletonHeading {...args} size="sm" />
          <SkeletonHeading {...args} size="sm" />
        </Flex>
      </Box>
    </Flex>
  ),
};
