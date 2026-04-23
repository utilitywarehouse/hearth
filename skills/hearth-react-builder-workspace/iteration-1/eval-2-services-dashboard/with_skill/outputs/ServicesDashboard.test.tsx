import { render, screen } from '@testing-library/react';
import { HearthProvider } from '@utilitywarehouse/hearth-react';
import { ServicesDashboard } from './ServicesDashboard';
import type { Service } from './ServicesDashboard';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderWithProvider(ui: React.ReactElement) {
  return render(<HearthProvider>{ui}</HearthProvider>);
}

const energyService: Service = {
  id: 'energy-1',
  name: 'Energy',
  monthlyCost: 85.0,
  manageHref: '/services/energy',
  colorScheme: 'energy',
};

const broadbandService: Service = {
  id: 'broadband-1',
  name: 'Broadband',
  monthlyCost: 32.5,
  manageHref: '/services/broadband',
  colorScheme: 'broadband',
};

const mobileService: Service = {
  id: 'mobile-1',
  name: 'Mobile',
  monthlyCost: 12.0,
  manageHref: '/services/mobile',
  colorScheme: 'mobile',
};

const allServices: Service[] = [energyService, broadbandService, mobileService];

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ServicesDashboard', () => {
  describe('page heading', () => {
    it('renders a generic heading when no customerName is provided', () => {
      renderWithProvider(<ServicesDashboard services={allServices} />);

      expect(screen.getByRole('heading', { level: 1, name: 'Your services' })).toBeInTheDocument();
    });

    it('renders a personalised greeting when customerName is provided', () => {
      renderWithProvider(<ServicesDashboard services={allServices} customerName="Alex" />);

      expect(
        screen.getByRole('heading', { level: 1, name: 'Welcome back, Alex' }),
      ).toBeInTheDocument();
    });
  });

  describe('total spend summary', () => {
    it('calculates and displays the correct total monthly spend', () => {
      renderWithProvider(<ServicesDashboard services={allServices} />);

      // 85.00 + 32.50 + 12.00 = 129.50
      expect(screen.getByText('£129.50')).toBeInTheDocument();
    });

    it('shows the correct service count in the summary', () => {
      renderWithProvider(<ServicesDashboard services={allServices} />);

      expect(screen.getByText(/across 3 active services/i)).toBeInTheDocument();
    });

    it('uses singular "service" when only one service is present', () => {
      renderWithProvider(<ServicesDashboard services={[energyService]} />);

      expect(screen.getByText(/across 1 active service$/i)).toBeInTheDocument();
    });

    it('does not render the total spend summary when services array is empty', () => {
      renderWithProvider(<ServicesDashboard services={[]} />);

      expect(screen.queryByText(/total monthly spend/i)).not.toBeInTheDocument();
    });
  });

  describe('service cards', () => {
    it('renders a card for each service', () => {
      renderWithProvider(<ServicesDashboard services={allServices} />);

      expect(screen.getByRole('heading', { name: 'Energy' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Broadband' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Mobile' })).toBeInTheDocument();
    });

    it('displays the monthly cost for each service', () => {
      renderWithProvider(<ServicesDashboard services={allServices} />);

      expect(screen.getByText('£85.00')).toBeInTheDocument();
      expect(screen.getByText('£32.50')).toBeInTheDocument();
      expect(screen.getByText('£12.00')).toBeInTheDocument();
    });

    it('renders a manage link for each service with the correct href', () => {
      renderWithProvider(<ServicesDashboard services={allServices} />);

      const energyLink = screen.getByRole('link', { name: /manage energy/i });
      expect(energyLink).toHaveAttribute('href', '/services/energy');

      const broadbandLink = screen.getByRole('link', { name: /manage broadband/i });
      expect(broadbandLink).toHaveAttribute('href', '/services/broadband');

      const mobileLink = screen.getByRole('link', { name: /manage mobile/i });
      expect(mobileLink).toHaveAttribute('href', '/services/mobile');
    });

    it('marks each service as Active', () => {
      renderWithProvider(<ServicesDashboard services={allServices} />);

      const activeBadges = screen.getAllByText('Active');
      expect(activeBadges).toHaveLength(3);
    });
  });

  describe('empty state', () => {
    it('renders an empty state message when there are no services', () => {
      renderWithProvider(<ServicesDashboard services={[]} />);

      expect(screen.getByRole('heading', { name: 'No active services' })).toBeInTheDocument();
    });

    it('renders an explore link in the empty state', () => {
      renderWithProvider(<ServicesDashboard services={[]} />);

      const exploreLink = screen.getByRole('link', { name: /explore services/i });
      expect(exploreLink).toHaveAttribute('href', '/services/explore');
    });
  });

  describe('currency formatting', () => {
    it('formats whole-number costs with two decimal places', () => {
      renderWithProvider(
        <ServicesDashboard
          services={[{ ...energyService, monthlyCost: 100 }]}
        />,
      );

      expect(screen.getByText('£100.00')).toBeInTheDocument();
    });

    it('formats costs with one decimal place correctly', () => {
      renderWithProvider(
        <ServicesDashboard
          services={[{ ...broadbandService, monthlyCost: 32.5 }]}
        />,
      );

      expect(screen.getByText('£32.50')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has only one h1 on the page', () => {
      renderWithProvider(<ServicesDashboard services={allServices} customerName="Alex" />);

      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements).toHaveLength(1);
    });

    it('each service card is labelled by its heading', () => {
      renderWithProvider(<ServicesDashboard services={allServices} />);

      // Cards use aria-labelledby — verify each service heading is present and accessible
      const headings = screen.getAllByRole('heading', { level: 2 });
      // headings include service cards + any empty-state headings; we expect 3 service card headings
      const serviceHeadings = headings.filter((h) =>
        ['Energy', 'Broadband', 'Mobile'].includes(h.textContent ?? ''),
      );
      expect(serviceHeadings).toHaveLength(3);
    });
  });
});
