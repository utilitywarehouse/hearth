import type { Meta, StoryObj } from '@storybook/react';

import { BodyText, Flex, InlineLink } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof InlineLink> = {
  title: 'Stories / InlineLink',
  component: InlineLink,
  argTypes: {
    children: { control: { type: 'text' } },
    href: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj<typeof InlineLink>;

const sizes = ['sm', 'md', 'lg'] as const;
const weights = ['regular', 'semibold', 'bold'] as const;

export const Playground: Story = {
  render: args => (
    <Flex
      direction="column"
      gap="400"
      width="500px"
      padding="400"
      backgroundColor="warmWhite50"
      align="center"
      justify="center"
    >
      <BodyText>
        <InlineLink {...args} />
      </BodyText>
      <BodyText>
        Agnes Martin was an American <InlineLink>abstract painter</InlineLink> known for her{' '}
        <InlineLink>minimalist</InlineLink> style. Martin&apos;s art was characterized by serene
        compositions featuring <InlineLink>grids and lines</InlineLink>. Martin&apos;s minimalist
        approach conveyed tranquility and <InlineLink>spirituality</InlineLink>, and her paintings
        often carried positive names reflective of her <InlineLink>philosophy</InlineLink>.
      </BodyText>
    </Flex>
  ),
  args: {
    children: 'InlineLink',
    href: '#',
  },
};

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="100">
        {sizes.map(size =>
          weights.map(weight => (
            <BodyText size={size} weight={weight}>
              <InlineLink href="#">
                InlineLink ({size}, {weight})
              </InlineLink>
            </BodyText>
          ))
        )}
      </Flex>
    );
  },
};

export const LengthyContent: Story = {
  render: args => (
    <Flex width="600px">
      <BodyText>
        To limit spend on international calls, turn on Budget Control and then{' '}
        <InlineLink {...args}>{args.children}</InlineLink>.
      </BodyText>
    </Flex>
  ),
  args: { children: 'follow our handy guide to set your International call cap' },
};

export const Inverted: Story = {
  render: args => (
    <Flex
      direction="column"
      gap="400"
      width="500px"
      padding="400"
      backgroundColor="uwPurple"
      align="center"
      justify="center"
    >
      <BodyText>
        <InlineLink {...args} />
      </BodyText>
      <BodyText>
        Agnes Martin was an American <InlineLink inverted>abstract painter</InlineLink> known for
        her <InlineLink inverted>minimalist</InlineLink> style. Martin&apos;s art was characterized
        by serene compositions featuring <InlineLink inverted>grids and lines</InlineLink>.
        Martin&apos;s minimalist approach conveyed tranquility and{' '}
        <InlineLink inverted>spirituality</InlineLink>, and her paintings often carried positive
        names reflective of her <InlineLink inverted>philosophy</InlineLink>.
      </BodyText>
    </Flex>
  ),
  args: {
    children: 'Inverted InlineLink',
    href: '#',
    inverted: true,
  },
};
