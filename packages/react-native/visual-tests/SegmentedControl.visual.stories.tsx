import type { Meta, StoryObj } from '@storybook/react-native';
import {
  BroadbandSmallIcon,
  ElectricitySmallIcon,
  MobileSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { SegmentedControl, SegmentedControlOption } from '../src/components/SegmentedControl';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/SegmentedControl',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const SegmentedControls: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Small">
        <SegmentedControl size="sm" value="week">
          <SegmentedControlOption value="day">Day</SegmentedControlOption>
          <SegmentedControlOption value="week">Week</SegmentedControlOption>
          <SegmentedControlOption value="month">Month</SegmentedControlOption>
        </SegmentedControl>
      </VTRow>
      <VTRow label="Medium">
        <SegmentedControl size="md" value="week">
          <SegmentedControlOption value="day">Day</SegmentedControlOption>
          <SegmentedControlOption value="week">Week</SegmentedControlOption>
          <SegmentedControlOption value="month">Month</SegmentedControlOption>
        </SegmentedControl>
      </VTRow>
      <VTRow label="Small with icons">
        <SegmentedControl size="sm" value="mobile">
          <SegmentedControlOption value="mobile" icon={MobileSmallIcon}>
            Mobile
          </SegmentedControlOption>
          <SegmentedControlOption value="broadband" icon={BroadbandSmallIcon}>
            Broadband
          </SegmentedControlOption>
          <SegmentedControlOption value="energy" icon={ElectricitySmallIcon}>
            Energy
          </SegmentedControlOption>
        </SegmentedControl>
      </VTRow>
      <VTRow label="Medium with icons">
        <SegmentedControl size="md" value="mobile">
          <SegmentedControlOption value="mobile" icon={MobileSmallIcon}>
            Mobile
          </SegmentedControlOption>
          <SegmentedControlOption value="broadband" icon={BroadbandSmallIcon}>
            Broadband
          </SegmentedControlOption>
          <SegmentedControlOption value="energy" icon={ElectricitySmallIcon}>
            Energy
          </SegmentedControlOption>
        </SegmentedControl>
      </VTRow>
      <VTRow label="Disabled">
        <SegmentedControl disabled value="week">
          <SegmentedControlOption value="day">Day</SegmentedControlOption>
          <SegmentedControlOption value="week">Week</SegmentedControlOption>
          <SegmentedControlOption value="month">Month</SegmentedControlOption>
        </SegmentedControl>
      </VTRow>
      <VTRow label="One option disabled">
        <SegmentedControl value="day">
          <SegmentedControlOption value="day">Day</SegmentedControlOption>
          <SegmentedControlOption value="week" disabled>
            Week
          </SegmentedControlOption>
          <SegmentedControlOption value="month">Month</SegmentedControlOption>
        </SegmentedControl>
      </VTRow>
    </VTGrid>
  ),
};
