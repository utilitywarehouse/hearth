import type { Meta, StoryObj } from '@storybook/react-native';
import { MobileSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Tab, Tabs, TabsList } from '../src/components/Tabs';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Tabs',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TabsStates: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Medium">
        <Tabs size="md" value="billing">
          <TabsList>
            <Tab value="account">Account</Tab>
            <Tab value="billing">Billing</Tab>
            <Tab value="usage">Usage</Tab>
          </TabsList>
        </Tabs>
      </VTRow>
      <VTRow label="Large">
        <Tabs size="lg" value="billing">
          <TabsList>
            <Tab value="account">Account</Tab>
            <Tab value="billing">Billing</Tab>
            <Tab value="usage">Usage</Tab>
          </TabsList>
        </Tabs>
      </VTRow>
      <VTRow label="Icons">
        <Tabs size="md" value="mobile">
          <TabsList>
            <Tab value="mobile" icon={MobileSmallIcon}>
              Mobile
            </Tab>
            <Tab value="other" icon={MobileSmallIcon}>
              Other
            </Tab>
          </TabsList>
        </Tabs>
      </VTRow>
      <VTRow label="One tab disabled">
        <Tabs size="md" value="account">
          <TabsList>
            <Tab value="account">Account</Tab>
            <Tab value="billing" disabled>
              Billing
            </Tab>
            <Tab value="usage">Usage</Tab>
          </TabsList>
        </Tabs>
      </VTRow>
      <VTRow label="All disabled">
        <Tabs size="md" value="account" disabled>
          <TabsList>
            <Tab value="account">Account</Tab>
            <Tab value="billing">Billing</Tab>
            <Tab value="usage">Usage</Tab>
          </TabsList>
        </Tabs>
      </VTRow>
    </VTGrid>
  ),
};
