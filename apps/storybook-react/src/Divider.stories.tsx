import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { colors } from '@utilitywarehouse/colour-system';

import { Divider } from '@utilitywarehouse/hearth-react/src/components/Divider/Divider.js';
import { Flex } from '@utilitywarehouse/hearth-react/src/components/Flex/Flex.js';
import { Heading } from '@utilitywarehouse/hearth-react/src/components/Heading/Heading.js';
import { Strong } from '@utilitywarehouse/hearth-react/src/components/Strong/Strong.js';
import { Box } from '@utilitywarehouse/hearth-react/src/components/Box/Box.js';
import { BodyText } from '@utilitywarehouse/hearth-react/src/components/BodyText/BodyText.js';

const meta: Meta<typeof Divider> = {
  title: 'Stories / Divider',
  component: Divider,
  argTypes: {
    orientation: { options: ['horizontal', 'vertical'], control: { type: 'radio' } },
    decorative: { control: { type: 'boolean' } },
    color: { control: { type: 'text' } },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
    color: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Workshop: Story = {};

export const KitchenSink: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="400" width="100%" maxWidth="800px" padding="200">
        <Flex direction="column" gap="100" paddingInline="400">
<Heading>Mobile number: 07891123456</Heading>
          <Flex gap="300" align="center">
            <BodyText>Unlimited Tariff</BodyText>
            <Divider decorative orientation="vertical" />
            <BodyText>
              Budget control: <Strong>On</Strong>
            </BodyText>
            <Divider decorative orientation="vertical" />
            <BodyText>
              SIM number: <Strong>249320592996</Strong>
            </BodyText>
          </Flex>
        </Flex>
        <Divider />
        <Flex direction="column" gap="100" paddingInline="400">
          <Heading>Mobile number: 07875123456</Heading>
          <Flex gap="300" align="center">
            <BodyText>Value Tariff</BodyText>
            <Divider decorative orientation="vertical" />
            <BodyText>
              Budget control: <Strong>On</Strong>
            </BodyText>
            <Divider decorative orientation="vertical" />
            <BodyText>
              SIM number: <Strong>249320592996</Strong>
            </BodyText>
          </Flex>
        </Flex>
        <Divider />
        <Flex direction="column" gap="100" paddingInline="400">
          <Heading>Mobile number: 07929123456</Heading>
          <Flex gap="300" align="center">
            <BodyText>Unlimited Tariff</BodyText>
            <Divider decorative orientation="vertical" />
            <BodyText>
              Budget control: <Strong>Off</Strong>
            </BodyText>
            <Divider decorative orientation="vertical" />
            <BodyText>
              SIM number: <Strong>249320592996</Strong>
            </BodyText>
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export const CustomColor: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="400" width="800px" padding="200">
        <Divider color={colors.pink500} />
        <BodyText>First item </BodyText>
        <Divider color={colors.pink500} />
        <BodyText>Second item </BodyText>
        <Divider color={colors.pink500} />
        <BodyText>Third item </BodyText>
        <Divider color={colors.pink500} />
      </Flex>
    );
  },
};

export const UsageOutsideFlexbox: Story = {
  render: () => (
    <Box width="100%" padding="300">
      <Divider decorative />
      <Box height="100px">
        <Divider orientation="vertical" decorative />
      </Box>
    </Box>
  ),
};
