import type { Meta, StoryObj } from '@storybook/react';

import { DetailText } from './DetailText';
import { Flex } from '../Flex/Flex';
import * as React from 'react';
import { sizes } from './DetailText.props';

const meta: Meta<typeof DetailText> = {
  title: 'Stories / DetailText',
  component: DetailText,
  parameters: { layout: 'centered' },
  argTypes: {
    children: { control: { type: 'text' } },
    as: { options: ['span', 'p', 'div'], control: { type: 'radio' } },
    size: { options: sizes, control: { type: 'radio' } },
  },
  args: {
    children: 'The five boxing wizards jump quickly.',
    size: 'md',
    align: { mobile: 'left', tablet: 'center', desktop: 'right' },
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

export const Workshop: Story = {};

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
