import { render, screen } from '@testing-library/react';
import { ServicesDashboard } from './ServicesDashboard';

describe('ServicesDashboard', () => {
  it('renders the page heading', () => {
    render(<ServicesDashboard />);
    expect(screen.getByRole('heading', { name: /your uw services/i })).toBeInTheDocument();
  });

  it('displays the total monthly spend', () => {
    render(<ServicesDashboard />);
    // Total is £89.50 + £35.00 + £22.00 = £146.50
    expect(screen.getByText('£146.50')).toBeInTheDocument();
  });

  it('renders all three service cards', () => {
    render(<ServicesDashboard />);
    expect(screen.getByRole('heading', { name: /energy/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /broadband/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mobile/i })).toBeInTheDocument();
  });

  it('shows the monthly cost for each service', () => {
    render(<ServicesDashboard />);
    expect(screen.getByText('£89.50')).toBeInTheDocument();
    expect(screen.getByText('£35.00')).toBeInTheDocument();
    expect(screen.getByText('£22.00')).toBeInTheDocument();
  });

  it('renders manage links for each service', () => {
    render(<ServicesDashboard />);
    expect(screen.getByRole('link', { name: /manage energy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /manage broadband/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /manage mobile/i })).toBeInTheDocument();
  });

  it('manage links point to the correct service URLs', () => {
    render(<ServicesDashboard />);
    expect(screen.getByRole('link', { name: /manage energy/i })).toHaveAttribute(
      'href',
      '/services/energy'
    );
    expect(screen.getByRole('link', { name: /manage broadband/i })).toHaveAttribute(
      'href',
      '/services/broadband'
    );
    expect(screen.getByRole('link', { name: /manage mobile/i })).toHaveAttribute(
      'href',
      '/services/mobile'
    );
  });

  it('shows Active badge for each service', () => {
    render(<ServicesDashboard />);
    const activeBadges = screen.getAllByText('Active');
    expect(activeBadges).toHaveLength(3);
  });
});
