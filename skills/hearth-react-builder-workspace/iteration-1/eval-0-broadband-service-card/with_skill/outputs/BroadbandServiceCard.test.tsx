import { render, screen } from '@testing-library/react';
import { BroadbandServiceCard } from './BroadbandServiceCard';

const defaultProps = {
  packageName: 'Full Fibre 500',
  monthlyCost: '£35.00',
  contractEndDate: '31 March 2026',
  manageHref: '/broadband/manage',
};

describe('BroadbandServiceCard', () => {
  describe('content rendering', () => {
    it('renders the package name as a heading', () => {
      render(<BroadbandServiceCard {...defaultProps} />);
      const heading = screen.getByRole('heading', { name: 'Full Fibre 500' });
      expect(heading).toBeInTheDocument();
    });

    it('renders the monthly cost', () => {
      render(<BroadbandServiceCard {...defaultProps} />);
      expect(screen.getByText('£35.00')).toBeInTheDocument();
    });

    it('renders the contract end date', () => {
      render(<BroadbandServiceCard {...defaultProps} />);
      expect(screen.getByText('31 March 2026')).toBeInTheDocument();
    });

    it('renders a "Manage broadband" link with the correct href', () => {
      render(<BroadbandServiceCard {...defaultProps} />);
      const link = screen.getByRole('link', { name: /manage broadband/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/broadband/manage');
    });
  });

  describe('hub offline warning', () => {
    it('does not show the hub offline warning by default', () => {
      render(<BroadbandServiceCard {...defaultProps} />);
      expect(screen.queryByText(/smart hub offline/i)).not.toBeInTheDocument();
    });

    it('does not show the hub offline warning when isHubOffline is false', () => {
      render(<BroadbandServiceCard {...defaultProps} isHubOffline={false} />);
      expect(screen.queryByText(/smart hub offline/i)).not.toBeInTheDocument();
    });

    it('shows the hub offline warning when isHubOffline is true', () => {
      render(<BroadbandServiceCard {...defaultProps} isHubOffline={true} />);
      expect(screen.getByText(/smart hub offline/i)).toBeInTheDocument();
    });

    it('shows the offline warning body text when isHubOffline is true', () => {
      render(<BroadbandServiceCard {...defaultProps} isHubOffline={true} />);
      expect(
        screen.getByText(/your smart hub appears to be offline/i)
      ).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('the card has an accessible label pointing to the package name heading', () => {
      render(<BroadbandServiceCard {...defaultProps} />);
      const heading = screen.getByRole('heading', { name: 'Full Fibre 500' });
      expect(heading).toHaveAttribute('id', 'broadband-card-heading');
    });

    it('renders supporting labels for monthly cost and contract end date', () => {
      render(<BroadbandServiceCard {...defaultProps} />);
      expect(screen.getByText('Monthly cost')).toBeInTheDocument();
      expect(screen.getByText('Contract ends')).toBeInTheDocument();
    });
  });
});
