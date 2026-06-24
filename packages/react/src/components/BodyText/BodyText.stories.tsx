import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { BodyText } from './BodyText';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;
const weights = ['regular', 'semibold', 'bold'] as const;
const colorValues = ['primary', 'secondary', 'brand', 'affirmative', 'inverted'] as const;

const meta: Meta<typeof BodyText> = {
  title: 'Typography / BodyText',
  component: BodyText,
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
        <BodyText size="sm" weight="regular">
          Hamburgefons (sm, regular)
        </BodyText>
        <BodyText size="sm" weight="semibold">
          Hamburgefons (sm, semibold)
        </BodyText>
        <BodyText size="sm" weight="bold">
          Hamburgefons (sm, bold)
        </BodyText>
        <BodyText size="md" weight="regular">
          Hamburgefons (md, regular)
        </BodyText>
        <BodyText size="md" weight="semibold">
          Hamburgefons (md, semibold)
        </BodyText>
        <BodyText size="md" weight="bold">
          Hamburgefons (md, bold)
        </BodyText>
        <BodyText size="lg" weight="regular">
          Hamburgefons (lg, regular)
        </BodyText>
        <BodyText size="lg" weight="semibold">
          Hamburgefons (lg, semibold)
        </BodyText>
        <BodyText size="lg" weight="bold">
          Hamburgefons (lg, bold)
        </BodyText>
        <BodyText size="xl" weight="regular">
          Hamburgefons (xl, regular)
        </BodyText>
        <BodyText size="xl" weight="semibold">
          Hamburgefons (xl, semibold)
        </BodyText>
        <BodyText size="xl" weight="bold">
          Hamburgefons (xl, bold)
        </BodyText>
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

export const Colours: Story = {
  render: () => {
    return (
      <Flex direction="column" width="fit-content">
        <Flex direction="column" backgroundColor="secondary" padding="400" gap="400">
          <BodyText color="primary">Primary</BodyText>
          <BodyText color="secondary">Secondary</BodyText>
          <BodyText color="brand">Brand</BodyText>
          <BodyText color="affirmative">Affirmative</BodyText>
        </Flex>
        <Box backgroundColor="brand" padding="400">
          <BodyText color="inverted">Inverted</BodyText>
        </Box>
      </Flex>
    );
  },
};

export const TextTruncate: Story = {
  name: 'Truncate',
  args: {
    truncate: true,
    weight: 'regular',
  },
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
};

export const InvertedText: Story = {
  args: {
    color: 'inverted',
  },
  render: args => {
    return (
      <Flex direction="column">
        <Box backgroundColor="brand" padding="400">
          <BodyText {...args}>Inverted text</BodyText>
        </Box>
      </Flex>
    );
  },
};

export const ParagraphSpacing: Story = {
  args: {
    truncate: true,
    weight: 'regular',
  },
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
              And don&apos;t forget, any domestic usage (e.g. washing machines) in that off-peak
              window will also be charged at the reduced rate.
            </BodyText>
          </Flex>
        ))}
      </Flex>
    );
  },
};
