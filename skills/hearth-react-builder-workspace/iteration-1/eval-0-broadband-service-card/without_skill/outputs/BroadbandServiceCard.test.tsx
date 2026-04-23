import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { BroadbandServiceCard } from './BroadbandServiceCard';

const defaultProps = {
  packageName: 'Full Fibre 100',
  monthlyCost: 35.99,
  contractEndDate: new Date('2026-03-31'),
  manageHref: '/broadband/manage',
};

describe('BroadbandServiceCard', () => {
  it('renders the package name', () => {
    render(<BroadbandServiceCard {...defaultProps} />);
    expect(screen.getByText('Full Fibre 100')).toBeInTheDocument();
  });

  it('renders the monthly cost formatted as GBP currency', () => {
    render(<BroadbandServiceCard {...defaultProps} />);
    expect(screen.getByText('£35.99 / month')).toBeInTheDocument();
  });

  it('renders the contract end date in a human-readable format', () => {
    render(<BroadbandServiceCard {...defaultProps} />);
    expect(screen.getByText('31 March 2026')).toBeInTheDocument();
  });

  it('renders a "Manage broadband" link pointing to the given href', () => {
    render(<BroadbandServiceCard {...defaultProps} />);
    const link = screen.getByRole('link', { name: /manage broadband/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/broadband/manage');
  });

  it('does not show the smart hub offline warning by default', () => {
    render(<BroadbandServiceCard {...defaultProps} />);
    expect(screen.queryByText('Smart hub offline')).not.toBeInTheDocument();
  });

  it('shows the smart hub offline warning when isSmartHubOffline is true', () => {
    render(<BroadbandServiceCard {...defaultProps} isSmartHubOffline />);
    expect(screen.getByText('Smart hub offline')).toBeInTheDocument();
    expect(
      screen.getByText(/your smart hub appears to be offline/i)
    ).toBeInTheDocument();
  });

  it('does not show the smart hub offline warning when isSmartHubOffline is false', () => {
    render(<BroadbandServiceCard {...defaultProps} isSmartHubOffline={false} />);
    expect(screen.queryByText('Smart hub offline')).not.toBeInTheDocument();
  });

  it('renders the "Broadband" heading', () => {
    render(<BroadbandServiceCard {...defaultProps} />);
    expect(screen.getByRole('heading', { name: 'Broadband' })).toBeInTheDocument();
  });

  it('renders the section labels for each data field', () => {
    render(<BroadbandServiceCard {...defaultProps} />);
    expect(screen.getByText('Package')).toBeInTheDocument();
    expect(screen.getByText('Monthly cost')).toBeInTheDocument();
    expect(screen.getByText('Contract end date')).toBeInTheDocument();
  });

  it('renders correctly with a different package and cost', () => {
    render(
      <BroadbandServiceCard
        {...defaultProps}
        packageName="Full Fibre 500"
        monthlyCost={49.0}
      />
    );
    expect(screen.getByText('Full Fibre 500')).toBeInTheDocument();
    expect(screen.getByText('£49.00 / month')).toBeInTheDocument();
  });
});
