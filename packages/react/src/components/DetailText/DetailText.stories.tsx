import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { DetailText } from './DetailText';

const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;
const colorValues = ['text', 'valid', 'invalid'] as const;

const meta: Meta<typeof DetailText> = {
  title: 'Typography / DetailText',
  component: DetailText,
  argTypes: {
    children: { control: { type: 'text' } },
    as: { options: ['span', 'p', 'div'], control: { type: 'radio' } },
    size: { options: sizes, control: { type: 'radio' } },
    color: { options: colorValues, control: { type: 'radio' } },
    inverted: { control: { type: 'boolean' } },
  },
  args: {
    children: 'The five boxing wizards jump quickly.',
    size: 'md',
    color: 'text',
  },
};

export default meta;
type Story = StoryObj<typeof DetailText>;

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="100">
        {sizes.map(size => (
          <DetailText key={size} size={size}>
            Hamburgefons ({size})
          </DetailText>
        ))}
      </Flex>
    );
  },
};

export const Playground: Story = {};

export const TextSizes: Story = {
  name: 'Sizes',
  render: () => {
    return (
      <Flex direction="column" gap="100">
        {sizes.map(size => (
          <DetailText key={size} size={size}>
            {size}
          </DetailText>
        ))}
        <DetailText size={{ mobile: 'sm', tablet: 'xl', desktop: '4xl' }}>
          Responsive size
        </DetailText>
      </Flex>
    );
  },
};

export const InvertedText: Story = {
  render: args => {
    return (
      <Flex direction="column">
        <Box backgroundColor="brand" padding="400">
          <DetailText {...args}>Inverted text</DetailText>
        </Box>
      </Flex>
    );
  },
  args: {
    inverted: true,
  },
};
