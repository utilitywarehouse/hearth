import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex, DetailText, Em } from '@utilitywarehouse/hearth-react';
import React from 'react';

const meta = {
  component: DetailText,
} satisfies Meta<typeof DetailText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KitchenSink: Story = {
  render: () => (
    <Flex gap="400">
      <Flex direction="column" gap="100">
        <DetailText size="sm">Hamburgefons</DetailText>
        <DetailText size="md">Hamburgefons</DetailText>
        <DetailText size="lg">Hamburgefons</DetailText>
        <DetailText size="xl">Hamburgefons</DetailText>
        <DetailText size="2xl">Hamburgefons</DetailText>
        <DetailText size="3xl">Hamburgefons</DetailText>
        <DetailText size="4xl">Hamburgefons</DetailText>
      </Flex>
      <Flex direction="column" gap="100">
        <DetailText size="sm">
          <Em>Hamburgefons</Em>
        </DetailText>
        <DetailText size="md">
          <Em>Hamburgefons</Em>
        </DetailText>
        <DetailText size="lg">
          <Em>Hamburgefons</Em>
        </DetailText>
        <DetailText size="xl">
          <Em>Hamburgefons</Em>
        </DetailText>
        <DetailText size="2xl">
          <Em>Hamburgefons</Em>
        </DetailText>
        <DetailText size="3xl">
          <Em>Hamburgefons</Em>
        </DetailText>
        <DetailText size="4xl">
          <Em>Hamburgefons</Em>
        </DetailText>
      </Flex>
    </Flex>
  ),
};
