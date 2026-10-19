import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import {
  ProgressStep,
  ProgressStepper,
  ProgressStepperText,
} from '../src/components/ProgressStepper';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/ProgressStepper',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Statuses: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="All incomplete">
        <View style={{ width: '100%' }}>
          <ProgressStepper>
            <ProgressStep id="1" status="incomplete" />
            <ProgressStep id="2" status="incomplete" />
            <ProgressStep id="3" status="incomplete" />
          </ProgressStepper>
        </View>
      </VTRow>
      <VTRow label="First active">
        <View style={{ width: '100%' }}>
          <ProgressStepper>
            <ProgressStep id="1" status="active" />
            <ProgressStep id="2" status="incomplete" />
            <ProgressStep id="3" status="incomplete" />
          </ProgressStepper>
        </View>
      </VTRow>
      <VTRow label="Mixed">
        <View style={{ width: '100%' }}>
          <ProgressStepper>
            <ProgressStep id="1" status="complete" />
            <ProgressStep id="2" status="complete" />
            <ProgressStep id="3" status="active" />
            <ProgressStep id="4" status="incomplete" />
          </ProgressStepper>
        </View>
      </VTRow>
      <VTRow label="All complete">
        <View style={{ width: '100%' }}>
          <ProgressStepper>
            <ProgressStep id="1" status="complete" />
            <ProgressStep id="2" status="complete" />
            <ProgressStep id="3" status="complete" />
          </ProgressStepper>
        </View>
      </VTRow>
      <VTRow label="With text">
        <ProgressStepperText currentStep={3} totalSteps={4} />
      </VTRow>
    </VTGrid>
  ),
};
