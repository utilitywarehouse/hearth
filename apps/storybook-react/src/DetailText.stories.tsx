import type { Meta, StoryObj } from '@storybook/react';
import { DetailText, Flex } from '@utilitywarehouse/hearth-react';

const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;

const meta: Meta<typeof DetailText> = {
  title: 'Stories / DetailText',
  component: DetailText,
  parameters: {
    docs: {
      description: {
        component: '`DetailText` is to be used for detail text.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    as: { options: ['span', 'p', 'div'], control: { type: 'radio' } },
    size: { options: sizes, control: { type: 'radio' } },
  },
  args: {
    children: 'The five boxing wizards jump quickly.',
    size: 'md',
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
