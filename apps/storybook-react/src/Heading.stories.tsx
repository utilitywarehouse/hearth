import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, Heading } from '@utilitywarehouse/hearth-react';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;

const meta: Meta<typeof Heading> = {
  title: 'Stories / Heading',
  component: Heading,
  parameters: {
    docs: {
      description: {
        component: '`Heading` is to be used for heading-level typography.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
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
      <Flex direction="column">
        <Box backgroundColor="uwPurple" padding="400">
          <Heading {...args}>Inverted text</Heading>
        </Box>
        <Box backgroundColor="darkPurple" padding="400">
          <Heading {...args}>Inverted text</Heading>
        </Box>
      </Flex>
    );
  },
  args: {
    inverted: true,
  },
};
