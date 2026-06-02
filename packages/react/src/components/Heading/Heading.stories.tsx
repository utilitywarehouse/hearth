import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { Heading } from './Heading';

const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

const meta: Meta<typeof Heading> = {
  title: 'Typography / Heading',
  component: Heading,
  argTypes: {
    children: { control: { type: 'text' } },
    as: { options: ['h1', 'h2', 'h3', 'h4'], control: { type: 'radio' } },
    size: { options: sizes, control: { type: 'radio' } },
    inverted: { control: { type: 'boolean' } },
  },
  args: {
    children: 'The five boxing wizards jump quickly.',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Playground: Story = {};

export const KitchenSink: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="100">
        {sizes.map(size => (
          <Heading key={size} size={size}>
            Hamburgefons ({size})
          </Heading>
        ))}
      </Flex>
    );
  },
};

export const InvertedText: Story = {
  render: args => {
    return (
      <Box backgroundColor="brand" padding="400">
        <Heading {...args}>Inverted text</Heading>
      </Box>
    );
  },
  args: {
    inverted: true,
  },
};
