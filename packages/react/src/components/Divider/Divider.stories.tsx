import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { Strong } from '../Strong/Strong';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components / Divider',
  component: Divider,
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

/** Divider used both to separate content within a Flex row and between stacked sections — used in Chromatic snapshot testing. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => {
    return (
      <Flex direction="column" gap="400" width="100%" maxWidth="800px" padding="200">
        <Flex direction="column" gap="100" paddingX="400">
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
        <Flex direction="column" gap="100" paddingX="400">
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
        <Flex direction="column" gap="100" paddingX="400">
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

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: { actions: { disable: true }, interactions: { disable: true } },
};

/** Divider also works outside a Flex container — set orientation to vertical when used within a sized parent. */
export const UsageOutsideFlexbox: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Box width="100%" padding="300">
      <Divider decorative />
      <Box height="100px">
        <Divider orientation="vertical" decorative />
      </Box>
    </Box>
  ),
};

/** Test-only: decorative dividers are hidden from assistive tech; semantic ones expose orientation. */
export const Semantics: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="200" height="100px">
      <Divider decorative />
      <Divider />
      <Divider orientation="vertical" />
      {/* @ts-expect-error testing an invalid orientation falls back to horizontal */}
      <Divider orientation="diagonal" />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const [decorative, horizontal, vertical, invalid] = canvasElement.querySelectorAll('hr');
    const separators = within(canvasElement).getAllByRole('separator');

    await expect(decorative).toHaveAttribute('aria-hidden', 'true');
    await expect(separators).toHaveLength(3);
    await expect(horizontal).not.toHaveAttribute('aria-orientation');
    await expect(vertical).toHaveAttribute('aria-orientation', 'vertical');
    await expect(invalid).toHaveAttribute('data-orientation', 'horizontal');
  },
};
