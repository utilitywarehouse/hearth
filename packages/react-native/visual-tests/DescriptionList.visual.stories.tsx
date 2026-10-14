import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { DescriptionList, DescriptionListItem } from '../src/components/DescriptionList';
import { Link } from '../src/components/Link';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/DescriptionList',
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
      <VTRow label="Row">
        <View style={{ width: '100%' }}>
          <DescriptionList direction="row">
            <DescriptionListItem heading="Account" description="123456789" />
            <DescriptionListItem
              heading="Status"
              description="Inactive"
              invalidText="Cannot be inactive"
            />
            <DescriptionListItem
              heading="Plan"
              description="Active"
              trailingContent={<Link showIcon={false}>Change</Link>}
            />
            <DescriptionListItem heading="Balance" description="Current" numericValue="£54.32" />
          </DescriptionList>
        </View>
      </VTRow>
      <VTRow label="Column">
        <View style={{ width: '100%' }}>
          <DescriptionList direction="column">
            <DescriptionListItem heading="Account" description="123456789" />
            <DescriptionListItem
              heading="Status"
              description="Inactive"
              invalidText="Cannot be inactive"
            />
            <DescriptionListItem heading="Balance" description="Current" numericValue="£54.32" />
          </DescriptionList>
        </View>
      </VTRow>
    </VTGrid>
  ),
};
