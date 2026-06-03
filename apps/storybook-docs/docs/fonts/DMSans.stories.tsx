import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex, BodyText, Em } from '@utilitywarehouse/hearth-react';
import React from 'react';

const meta = {
  title: 'DM Sans',
  component: BodyText,
} satisfies Meta<typeof BodyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KitchenSink: Story = {
  render: () => (
    <Flex gap="400">
      <Flex direction="column" gap="100">
        <BodyText size="sm">Hamburgefons</BodyText>
        <BodyText size="sm">
          <Em>Hamburgefons</Em>
        </BodyText>
        <BodyText size="md">Hamburgefons</BodyText>
        <BodyText size="md">
          <Em>Hamburgefons</Em>
        </BodyText>
        <BodyText size="lg">Hamburgefons</BodyText>
        <BodyText size="lg">
          <Em>Hamburgefons</Em>
        </BodyText>
      </Flex>
      <Flex direction="column" gap="100">
        <BodyText size="sm" weight="semibold">
          Hamburgefons
        </BodyText>
        <BodyText size="sm" weight="semibold">
          <Em>Hamburgefons</Em>
        </BodyText>
        <BodyText size="md" weight="semibold">
          Hamburgefons
        </BodyText>
        <BodyText size="md" weight="semibold">
          <Em>Hamburgefons</Em>
        </BodyText>
        <BodyText size="lg" weight="semibold">
          Hamburgefons
        </BodyText>
        <BodyText size="lg" weight="semibold">
          <Em>Hamburgefons</Em>
        </BodyText>
      </Flex>
      <Flex direction="column" gap="100">
        <BodyText size="sm" weight="bold">
          Hamburgefons
        </BodyText>
        <BodyText size="sm" weight="bold">
          <Em>Hamburgefons</Em>
        </BodyText>
        <BodyText size="md" weight="bold">
          Hamburgefons
        </BodyText>
        <BodyText size="md" weight="bold">
          <Em>Hamburgefons</Em>
        </BodyText>
        <BodyText size="lg" weight="bold">
          Hamburgefons
        </BodyText>
        <BodyText size="lg" weight="bold">
          <Em>Hamburgefons</Em>
        </BodyText>
      </Flex>
    </Flex>
  ),
};
