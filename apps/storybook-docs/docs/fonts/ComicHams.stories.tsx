import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex, Heading } from '@utilitywarehouse/hearth-react';
import React from 'react';

const meta = {
  title: 'Fonts / ComicHams',
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KitchenSink: Story = {
  render: () => (
    <Flex direction="column" gap="100">
      <Heading size="sm">Hamburgefons</Heading>
      <Heading size="md">Hamburgefons</Heading>
      <Heading size="lg">Hamburgefons</Heading>
      <Heading size="xl">Hamburgefons</Heading>
      <Heading size="2xl">Hamburgefons</Heading>
    </Flex>
  ),
};
