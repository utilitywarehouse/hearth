import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { Skeleton } from './Skeleton';
import { SkeletonBox } from './SkeletonBox';

const meta: Meta<typeof SkeletonBox> = {
  title: 'Components / Skeleton / SkeletonBox',
  component: SkeletonBox,
  decorators: [
    Story => (
      <Flex width="100%" padding="500" backgroundColor="secondary" justifyContent="center">
        <Story />
      </Flex>
    ),
  ],
  argTypes: {
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

/** Interactive sandbox — use the controls panel to explore props such as width, height, and borderRadius. */
export const Playground: Story = {
  render: args => (
    <Skeleton loadingTitle="playground story">
      <SkeletonBox {...args} />
    </Skeleton>
  ),
};

/** Stack multiple SkeletonBoxes to placeholder a block of related content. */
export const Blocks: Story = {
  render: args => (
    <Skeleton loadingTitle="blocks story">
      <Flex direction="column" gap="200" width="420px">
        <SkeletonBox {...args} width="100%" height="24px" />
        <SkeletonBox {...args} width="100%" height="24px" />
        <SkeletonBox {...args} width="80%" height="24px" />
      </Flex>
    </Skeleton>
  ),
};

/** Set borderRadius to full with equal width and height to placeholder a circular element, such as an avatar. */
export const Circle: Story = {
  args: { borderRadius: 'full', width: '96px', height: '96px' },
  render: args => (
    <Skeleton loadingTitle="circle story">
      <SkeletonBox {...args} />
    </Skeleton>
  ),
};

/** Combine SkeletonBoxes of different sizes to placeholder a typical card layout. */
export const CardPlaceholder: Story = {
  render: args => (
    <Skeleton loadingTitle="card placeholder story">
      <Flex direction="column" gap="300" width="320px">
        <SkeletonBox {...args} width="100%" height="160px" borderRadius="sm" />
        <SkeletonBox {...args} width="60%" height="20px" borderRadius="xs" />
        <SkeletonBox {...args} width="100%" height="14px" borderRadius="xs" />
        <SkeletonBox {...args} width="85%" height="14px" borderRadius="xs" />
      </Flex>
    </Skeleton>
  ),
};
