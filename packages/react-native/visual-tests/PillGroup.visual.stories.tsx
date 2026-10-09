import type { Meta, StoryObj } from '@storybook/react-native';
import { UserSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { View } from 'react-native';
import { Pill, PillGroup } from '../src/components/PillGroup';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/PillGroup',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

/** Single and multi select, with and without icons. Pill has no disabled styling. */
export const Selection: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Single">
        <View style={{ width: '100%' }}>
          <PillGroup value="2" onValueChange={noop}>
            <Pill value="1" label="Pill 1" />
            <Pill value="2" label="Pill 2" />
            <Pill value="3" label="Pill 3" />
            <Pill value="4" label="Pill 4" />
            <Pill value="5" label="Pill 5" />
          </PillGroup>
        </View>
      </VTRow>
      <VTRow label="Multiple">
        <View style={{ width: '100%' }}>
          <PillGroup multiple value={['1', '3']} onValueChange={noop}>
            <Pill value="1" label="Pill 1" />
            <Pill value="2" label="Pill 2" />
            <Pill value="3" label="Pill 3" />
            <Pill value="4" label="Pill 4" />
            <Pill value="5" label="Pill 5" />
          </PillGroup>
        </View>
      </VTRow>
      <VTRow label="Icons">
        <View style={{ width: '100%' }}>
          <PillGroup multiple value={['1']} onValueChange={noop}>
            <Pill value="1" label="Selected" icon={UserSmallIcon} />
            <Pill value="2" label="Unselected" icon={UserSmallIcon} />
          </PillGroup>
        </View>
      </VTRow>
    </VTGrid>
  ),
};
