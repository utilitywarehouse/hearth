import type { Meta, StoryObj } from '@storybook/react-native';
import type { ImageSourcePropType } from 'react-native';
import pigs from '../docs/assets/pigs.png';
import { Avatar } from '../src/components/Avatar';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Avatar',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  // The fallback covers the image until it loads, so wait before capturing.
  parameters: { chromatic: { disableSnapshot: false, delay: 300 } },
  render: () => (
    <VTGrid>
      <VTRow label="Initials">
        <Avatar size="sm" name="Ada Lovelace" />
        <Avatar size="md" name="Ada Lovelace" />
      </VTRow>
      <VTRow label="Icon fallback">
        <Avatar size="sm" />
        <Avatar size="md" />
      </VTRow>
      <VTRow label="Local image">
        <Avatar size="sm" src={pigs as ImageSourcePropType} />
        <Avatar size="md" src={pigs as ImageSourcePropType} />
      </VTRow>
    </VTGrid>
  ),
};
