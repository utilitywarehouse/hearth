import type { Meta, StoryObj } from '@storybook/react';

import { BodyText } from './BodyText';
import { Flex } from '../Flex/Flex';
import * as React from 'react';
import { sizes, weights } from './BodyText.props';

const meta: Meta<typeof BodyText> = {
  title: 'Stories / BodyText',
  component: BodyText,
  parameters: { layout: 'centered' },
  argTypes: {
    children: { control: { type: 'text' } },
    as: { options: ['span', 'p', 'div'], control: { type: 'radio' } },
    size: { options: sizes, control: { type: 'radio' } },
    weight: { options: weights, control: { type: 'radio' } },
    truncate: { control: { type: 'boolean' } },
  },
  args: {
    children: 'The five boxing wizards jump quickly.',
    size: 'md',
    weight: 'regular',
    align: { mobile: 'left', tablet: 'center', desktop: 'right' },
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
        {sizes.map(size => (
          <>
            <BodyText size={size}>Hamburgefons ({size})</BodyText>
            <BodyText size={size} weight="bold">
              Hamburgefons ({size}, bold)
            </BodyText>
            <BodyText size={size} style={{ fontStyle: 'italic' }}>
              Hamburgefons ({size}, italic)
            </BodyText>
            <BodyText size={size} weight="bold" style={{ fontStyle: 'italic' }}>
              Hamburgefons ({size}, bold, italic)
            </BodyText>
          </>
        ))}
      </Flex>
    );
  },
};

export const Workshop: Story = {};

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
