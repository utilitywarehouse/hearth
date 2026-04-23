import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@utilitywarehouse/hearth-react';
import { BroadbandServiceCard } from './BroadbandServiceCard';

const meta: Meta<typeof BroadbandServiceCard> = {
  title: 'Evals / BroadbandServiceCard',
  component: BroadbandServiceCard,
} satisfies Meta<typeof BroadbandServiceCard>;

export default meta;
type Story = StoryObj<typeof BroadbandServiceCard>;

export const Default: Story = {
  render: () => (
    <Box padding="400" maxWidth="480px">
      <BroadbandServiceCard
        packageName="Full Fibre 500"
        monthlyCost="£35.00"
        contractEndDate="31 March 2026"
        manageHref="#"
      />
    </Box>
  ),
};

export const HubOffline: Story = {
  render: () => (
    <Box padding="400" maxWidth="480px">
      <BroadbandServiceCard
        packageName="Full Fibre 500"
        monthlyCost="£35.00"
        contractEndDate="31 March 2026"
        manageHref="#"
        isHubOffline
      />
    </Box>
  ),
};

export const ContractEndingSoon: Story = {
  render: () => (
    <Box padding="400" maxWidth="480px">
      <BroadbandServiceCard
        packageName="Full Fibre 100"
        monthlyCost="£28.00"
        contractEndDate="30 April 2026"
        manageHref="#"
      />
    </Box>
  ),
};
