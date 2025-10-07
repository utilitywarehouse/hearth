import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, BodyText, Flex } from '@utilitywarehouse/hearth-react';

const sizes = ['sm', 'md', 'lg'] as const;
const weights = ['regular', 'semibold', 'bold'] as const;
const colorValues = ['primary', 'secondary', 'brand', 'affirmative', 'inverted'] as const;

const meta: Meta<typeof BodyText> = {
  title: 'Stories / BodyText',
  component: BodyText,
  parameters: {
    docs: {
      description: {
        component: '`BodyText` is to be used for body text.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    as: { options: ['span', 'p', 'div'], control: { type: 'radio' } },
    size: { options: sizes, control: { type: 'radio' } },
    weight: { options: weights, control: { type: 'radio' } },
    color: { options: colorValues, control: { type: 'select' } },
    truncate: { control: { type: 'boolean' } },
    paragraphSpacing: { control: { type: 'boolean' } },
  },
  args: {
    children: 'The five boxing wizards jump quickly.',
    size: 'md',
    weight: 'regular',
    truncate: false,
  },
};

export default meta;
type Story = StoryObj<typeof BodyText>;

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="100">
        {sizes.map(size =>
          weights.map(weight => (
            <BodyText size={size} weight={weight}>
              Hamburgefons ({size}, {weight})
            </BodyText>
          ))
        )}
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
          <BodyText key={size} size={size}>
            {size}
          </BodyText>
        ))}
        <BodyText size={{ mobile: 'sm', tablet: 'md', desktop: 'lg' }}>Responsive size</BodyText>
      </Flex>
    );
  },
};

export const TextWeights: Story = {
  name: 'Weights',
  render: () => {
    return (
      <Flex direction="column" gap="100">
        {weights.map(weight => (
          <BodyText key={weight} weight={weight}>
            {weight}
          </BodyText>
        ))}
        <BodyText weight={{ mobile: 'bold', tablet: 'regular' }}>Responsive weight</BodyText>
      </Flex>
    );
  },
};

export const TextTruncate: Story = {
  name: 'Truncate',
  render: args => {
    return (
      <Flex direction="column" gap="100" width="200px">
        {sizes.map(size => (
          <BodyText key={size} {...args} size={size}>
            the quick brown fox jumped over the lazy dog.
          </BodyText>
        ))}
      </Flex>
    );
  },
  args: {
    truncate: true,
    weight: 'regular',
  },
};

export const InvertedText: Story = {
  render: args => {
    return (
      <Flex direction="column">
        <Box backgroundColor="uwPurple" padding="400">
          <BodyText {...args}>Inverted text</BodyText>
        </Box>
        <Box backgroundColor="darkPurple" padding="400">
          <BodyText {...args}>Inverted text</BodyText>
        </Box>
      </Flex>
    );
  },
  args: {
    inverted: true,
  },
};

export const ParagraphSpacing: Story = {
  render: () => {
    return (
      <Flex gap="500">
        {sizes.map(size => (
          <Flex key={size} direction="column" width="360px">
            <BodyText paragraphSpacing size={size}>
              EV tariffs offer fantastic value if your driving patterns mean you can regularly
              charge your car at home - and can schedule your vehicle to charge while you sleep.
            </BodyText>
            <BodyText paragraphSpacing size={size}>
              You’ll get the most value out of our EV tariff by consistently charging your car
              off-peak between midnight and 5am in the morning
            </BodyText>
            <BodyText size={size}>
              And don't forget, any domestic usage (e.g. washing machines) in that off-peak window
              will also be charged at the reduced rate.
            </BodyText>
          </Flex>
        ))}
      </Flex>
    );
  },
  args: {
    truncate: true,
    weight: 'regular',
  },
};
