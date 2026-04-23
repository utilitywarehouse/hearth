import type { Meta, StoryObj } from '@storybook/react-vite';
import { ServicesDashboard } from './ServicesDashboard';

const meta: Meta<typeof ServicesDashboard> = {
  title: 'Components / ServicesDashboard',
  component: ServicesDashboard,
} satisfies Meta<typeof ServicesDashboard>;

export default meta;
type Story = StoryObj<typeof ServicesDashboard>;

const allServices = [
  { id: 'energy', name: 'Energy', monthlyCost: 85.0, manageHref: '#', colorScheme: 'energy' as const },
  { id: 'broadband', name: 'Broadband', monthlyCost: 32.5, manageHref: '#', colorScheme: 'broadband' as const },
  { id: 'mobile', name: 'Mobile', monthlyCost: 12.0, manageHref: '#', colorScheme: 'mobile' as const },
];

export const Default: Story = {
  render: () => (
    <ServicesDashboard
      customerName="Alex"
      services={allServices}
    />
  ),
};

export const NoCustomerName: Story = {
  render: () => (
    <ServicesDashboard services={allServices} />
  ),
};

export const SingleService: Story = {
  render: () => (
    <ServicesDashboard
      customerName="Alex"
      services={[allServices[0]]}
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <ServicesDashboard services={[]} />
  ),
};
