import type { Meta, StoryObj } from '@storybook/react-vite';

import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';
import { InlineLink } from './InlineLink';
import type { InlineLinkProps } from './InlineLink.props';

const meta: Meta<typeof InlineLink> = {
  title: 'Typography / InlineLink',
  component: InlineLink,
  argTypes: {
    children: { control: { type: 'text' } },
    href: { control: { type: 'text' } },
    color: { control: { type: 'radio' }, options: ['default', 'inverted', 'inherit'] },
    target: { control: { type: 'text' } },
    hideOpenIcon: { control: { type: 'boolean' } },
  },
  args: {
    children: 'InlineLink',
    href: '#',
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
      backgroundColor="primary"
      alignItems="center"
      justifyContent="center"
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
};

export const OpenInNewTab: Story = {
  args: {
    target: '_blank',
  },
  render: args => (
    <Flex gap="600">
      <InlineLink {...args}>Visit help pages</InlineLink>
      <InlineLink {...args} hideOpenIcon>
        Go to help
      </InlineLink>
    </Flex>
  ),
};

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="100">
        {sizes.map(size =>
          weights.map(weight => (
            <BodyText key={`${size}-${weight}`} size={size} weight={weight}>
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
  render: (args: Pick<InlineLinkProps, 'children'>) => (
    <Flex width="600px">
      <BodyText>
        To limit spend on international calls, turn on Budget Control and then{' '}
        <InlineLink {...args}>{args.children}</InlineLink>.
      </BodyText>
    </Flex>
  ),
  args: { children: 'follow our handy guide to set your International call cap' },
};

export const Color: Story = {
  render: args => (
    <Flex
      direction="column"
      gap="600"
      width="500px"
      backgroundColor="primary"
      alignItems="center"
      justifyContent="center"
    >
      <Flex direction="column" gap="400" backgroundColor="brand" padding="400">
        <BodyText>
          <InlineLink {...args} color="inverted">
            Inverted color
          </InlineLink>
        </BodyText>
        <BodyText color="inverted">
          Agnes Martin was an American <InlineLink color="inverted">abstract painter</InlineLink>{' '}
          known for her <InlineLink color="inverted">minimalist</InlineLink> style. Martin&apos;s
          art was characterized by serene compositions featuring{' '}
          <InlineLink color="inverted">grids and lines</InlineLink>. Martin&apos;s minimalist
          approach conveyed tranquility and <InlineLink color="inverted">spirituality</InlineLink>,
          and her paintings often carried positive names reflective of her{' '}
          <InlineLink color="inverted">philosophy</InlineLink>.
        </BodyText>
      </Flex>
      <Flex direction="column" gap="400" backgroundColor="secondary" padding="400">
        <BodyText color="primary">
          <InlineLink {...args} color="inherit">
            Inherited color
          </InlineLink>
        </BodyText>
        <BodyText color="brand">
          Agnes Martin was an American <InlineLink color="inherit">abstract painter</InlineLink>{' '}
          known for her <InlineLink color="inherit">minimalist</InlineLink> style. Martin&apos;s art
          was characterized by serene compositions featuring{' '}
          <InlineLink color="inherit">grids and lines</InlineLink>. Martin&apos;s minimalist
          approach conveyed tranquility and <InlineLink color="inherit">spirituality</InlineLink>,
          and her paintings often carried positive names reflective of her{' '}
          <InlineLink color="inherit">philosophy</InlineLink>.
        </BodyText>
      </Flex>
    </Flex>
  ),
  args: {
    href: '#',
  },
};
