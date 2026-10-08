import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { DetailText } from '../src/components/DetailText';
import { Divider } from '../src/components/Divider';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Divider',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Orientations: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Horizontal">
        <View style={{ width: '100%' }}>
          <Divider />
        </View>
      </VTRow>
      <VTRow label="Horizontal with spacing">
        <View style={{ width: '100%' }}>
          <DetailText>Above</DetailText>
          <Divider spacing="md" />
          <DetailText>Below</DetailText>
        </View>
      </VTRow>
      <VTRow label="Vertical">
        <View style={{ flexDirection: 'row', height: 48, alignItems: 'center' }}>
          <DetailText>Left</DetailText>
          <Divider orientation="vertical" spacing="md" />
          <DetailText>Right</DetailText>
        </View>
      </VTRow>
    </VTGrid>
  ),
};
