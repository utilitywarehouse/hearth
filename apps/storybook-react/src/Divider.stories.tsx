import type { Meta, StoryObj } from '@storybook/react';

import { BodyText, Box, Divider, Flex, Heading, Strong } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Divider> = {
  title: 'Stories / Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component:
          'Used to provide a visual break and semantically divide content. Supports vertical and horizontal orientations. Vertical dividers will only be visible when contained inside an element with display set to `flex` or `grid`.',
      },
    },
  },
  argTypes: {
    orientation: { options: ['horizontal', 'vertical'], control: { type: 'radio' } },
    decorative: { control: { type: 'boolean' } },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
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
          <Flex gap="300" alignItems="center">
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
          <Flex gap="300" alignItems="center">
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
          <Flex gap="300" alignItems="center">
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
