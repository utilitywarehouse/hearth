import type { Meta, StoryObj } from '@storybook/react';

import { BodyText } from './BodyText';
import { Flex } from '../Flex/Flex';
import * as React from 'react';

const variants = ['subtitle', 'body', 'legalNote', 'caption'] as const;
const weights = ['regular', 'medium', 'semibold'] as const;

const meta: Meta<typeof BodyText> = {
  title: 'Stories / BodyText',
  component: BodyText,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: { type: 'text' } },
    variant: { options: variants, control: { type: 'radio' } },
    weight: { options: weights, control: { type: 'radio' } },
    truncate: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Hamburgefons',
    variant: 'body',
    weight: { mobile: 'regular', tablet: 'medium', desktop: 'semibold' },
    align: { mobile: 'left', tablet: 'center', desktop: 'right' },
    truncate: false,
    color: '',
  },
};

export default meta;
type Story = StoryObj<typeof BodyText>;

export const Workshop: Story = {};

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="8px">
        {variants.map(variant => (
          <BodyText key={variant} variant={variant}>
            Hamburgefons
          </BodyText>
        ))}
      </Flex>
    );
  },
};
