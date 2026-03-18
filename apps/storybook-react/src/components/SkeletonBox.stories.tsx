import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex, SkeletonBox } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof SkeletonBox> = {
  title: 'Stories / SkeletonBox',
  component: SkeletonBox,
  argTypes: {
    as: { options: ['div', 'span'], control: { type: 'radio' } },
    width: { control: { type: 'text' } },
    height: { control: { type: 'text' } },
    borderRadius: {
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
      control: { type: 'select' },
    },
  },
  args: {
    width: '160px',
    height: '96px',
    borderRadius: 'xs',
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonBox>;

export const Playground: Story = {};

export const Blocks: Story = {
  render: args => (
    <Flex direction="column" gap="200">
      <SkeletonBox {...args} width="100%" height="24px" />
      <SkeletonBox {...args} width="100%" height="24px" />
      <SkeletonBox {...args} width="80%" height="24px" />
    </Flex>
  ),
};

export const CardPlaceholder: Story = {
  render: args => (
    <Flex direction="column" gap="300" width="320px">
      <SkeletonBox {...args} width="100%" height="160px" borderRadius="sm" />
      <SkeletonBox {...args} width="60%" height="20px" borderRadius="xs" />
      <SkeletonBox {...args} width="100%" height="14px" borderRadius="xs" />
      <SkeletonBox {...args} width="85%" height="14px" borderRadius="xs" />
    </Flex>
  ),
};
