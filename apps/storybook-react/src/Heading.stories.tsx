import type { Meta, StoryObj } from '@storybook/react';
import { Flex, Heading } from '@utilitywarehouse/hearth-react';

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
  },
  args: {
    children: 'The five boxing wizards jump quickly.',
    size: 'md',
    align: { mobile: 'left', tablet: 'center', desktop: 'right' },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Workshop: Story = {};

export const KitchenSink: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="8px">
        {sizes.map(size => (
          <Heading key={size} size={size}>
            Hamburgefons ({size})
          </Heading>
        ))}
      </Flex>
    );
  },
};
