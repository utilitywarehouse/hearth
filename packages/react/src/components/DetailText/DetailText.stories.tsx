import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { BodyText } from '../BodyText/BodyText';
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
    equalizeLineHeight: { control: { type: 'boolean' } },
  },
  args: {
    children: 'The five boxing wizards jump quickly.',
    size: 'md',
    color: 'text',
  },
};

export default meta;
type Story = StoryObj<typeof DetailText>;

/** Visual matrix of all text sizes, used in docs and Chromatic snapshot testing. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    chromatic: { disableSnapshot: false },
  },
  render: () => {
    return (
      <Flex direction="column" gap="100">
        <DetailText size="sm">Hamburgefons (sm)</DetailText>
        <DetailText size="md">Hamburgefons (md)</DetailText>
        <DetailText size="lg">Hamburgefons (lg)</DetailText>
        <DetailText size="xl">Hamburgefons (xl)</DetailText>
        <DetailText size="2xl">Hamburgefons (2xl)</DetailText>
        <DetailText size="3xl">Hamburgefons (3xl)</DetailText>
        <DetailText size="4xl">Hamburgefons (4xl)</DetailText>
      </Flex>
    );
  },
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = { parameters: { actions: { disable: true } } };

/** Set size to control the text scale, including a responsive object across breakpoints. */
export const TextSizes: Story = {
  name: 'Sizes',
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/**
 * Without `equalizeLineHeight`, a large `DetailText` next to smaller text in
 * a bottom-aligned row doesn't sit flush with it, because the default
 * line-height adds space below the glyphs. Set `equalizeLineHeight` to
 * remove that space.
 */
export const EqualizeLineHeight: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  name: 'Equalize line-height',
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <Flex direction="row" alignItems="end" gap="50">
          <DetailText size="2xl">£42.00</DetailText>
          <BodyText size="sm">/month</BodyText>
        </Flex>
        <Flex direction="row" alignItems="end" gap="50">
          <DetailText size="2xl" equalizeLineHeight>
            £42.00
          </DetailText>
          <BodyText size="sm">/month</BodyText>
        </Flex>
      </Flex>
    );
  },
};

/** Set inverted to adapt text color for dark backgrounds. */
export const InvertedText: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: {
    inverted: true,
  },
  render: args => {
    return (
      <Flex direction="column">
        <Box backgroundColor="brand" padding="400">
          <DetailText {...args}>Inverted text</DetailText>
        </Box>
      </Flex>
    );
  },
};
