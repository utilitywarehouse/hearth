import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Timeline, TimelineItem } from '../src/components/Timeline';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Timeline',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Progress">
        <View style={{ width: '100%' }}>
          <Timeline variant="progress">
            <TimelineItem label="Complete" helperText="Done" state="complete" />
            <TimelineItem label="Active" helperText="In progress" state="active" />
            <TimelineItem label="Incomplete" helperText="Pending" state="incomplete" />
          </Timeline>
        </View>
      </VTRow>
      <VTRow label="Static">
        <View style={{ width: '100%' }}>
          <Timeline variant="static">
            <TimelineItem label="First" helperText="08:15" />
            <TimelineItem label="Second" helperText="10:40" />
            <TimelineItem label="Third" helperText="13:25" />
          </Timeline>
        </View>
      </VTRow>
    </VTGrid>
  ),
};
