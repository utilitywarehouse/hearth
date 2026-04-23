import {
  Box,
  Flex,
  Grid,
  Container,
  Heading,
  BodyText,
  DetailText,
  Card,
  CardContent,
  CardInteraction,
  Divider,
  Badge,
  IconContainer,
  Link,
} from '@utilitywarehouse/hearth-react';
import {
  ElectricityMediumIcon,
  BroadbandMediumIcon,
  MobileMediumIcon,
  ChevronRightSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ServiceColorScheme = 'energy' | 'broadband' | 'mobile';

export interface Service {
  /** Unique identifier for the service */
  id: string;
  /** Display name, e.g. "Energy", "Broadband", "Mobile" */
  name: string;
  /** Monthly cost in pounds, e.g. 45.99 */
  monthlyCost: number;
  /** Destination URL for the "Manage" link */
  manageHref: string;
  /** UW brand colour scheme for the card */
  colorScheme: ServiceColorScheme;
}

export interface ServicesDashboardProps {
  /** The customer's given name, used in the greeting */
  customerName?: string;
  /** Array of active services to display */
  services: Service[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(amount: number): string {
  return `£${amount.toFixed(2)}`;
}

const SERVICE_ICON: Record<ServiceColorScheme, ReactNode> = {
  energy: <ElectricityMediumIcon aria-hidden="true" />,
  broadband: <BroadbandMediumIcon aria-hidden="true" />,
  mobile: <MobileMediumIcon aria-hidden="true" />,
};

// ---------------------------------------------------------------------------
// ServiceCard
// ---------------------------------------------------------------------------

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  const { name, monthlyCost, manageHref, colorScheme } = service;
  const icon = SERVICE_ICON[colorScheme];
  const headingId = `service-card-${service.id}-heading`;

  return (
    <Card
      colorScheme={colorScheme}
      variant="subtle"
      shadowColor={colorScheme}
      aria-labelledby={headingId}
    >
      <CardContent direction="column" spacing="md">
        {/* Icon row */}
        <Flex alignItems="center" gap="200">
          <IconContainer colorScheme={colorScheme}>
            {icon}
          </IconContainer>
          <Heading as="h2" size="sm" id={headingId}>
            {name}
          </Heading>
          <Box marginLeft="auto">
            <Badge colorScheme="positive">Active</Badge>
          </Box>
        </Flex>

        <Divider />

        {/* Cost */}
        <Flex direction="column" gap="100">
          <BodyText size="sm" color="secondary">
            Monthly cost
          </BodyText>
          <DetailText size="2xl">{formatCurrency(monthlyCost)}</DetailText>
          <BodyText size="sm" color="secondary">
            per month
          </BodyText>
        </Flex>

        {/* Manage link */}
        <CardInteraction asChild>
          <Link href={manageHref}>
            Manage {name}
            <ChevronRightSmallIcon />
          </Link>
        </CardInteraction>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// TotalSpendSummary
// ---------------------------------------------------------------------------

interface TotalSpendSummaryProps {
  total: number;
  serviceCount: number;
}

function TotalSpendSummary({ total, serviceCount }: TotalSpendSummaryProps) {
  return (
    <Card variant="subtle" colorScheme="neutralStrong">
      <CardContent direction={{ mobile: 'column', tablet: 'row' }} spacing="md">
        <Flex direction="column" gap="100" alignItems={{ mobile: 'start', tablet: 'start' }}>
          <BodyText size="sm" color="secondary">
            Total monthly spend
          </BodyText>
          <DetailText size={{ mobile: '3xl', desktop: '4xl' }} as="p">
            {formatCurrency(total)}
          </DetailText>
          <BodyText size="sm" color="secondary">
            across {serviceCount} active {serviceCount === 1 ? 'service' : 'services'}
          </BodyText>
        </Flex>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// ServicesDashboard (main export)
// ---------------------------------------------------------------------------

export function ServicesDashboard({ customerName, services }: ServicesDashboardProps) {
  const totalSpend = services.reduce((sum, svc) => sum + svc.monthlyCost, 0);

  return (
    <Container paddingY={{ mobile: '400', desktop: '800' }}>
      <Flex direction="column" gap={{ mobile: '400', desktop: '600' }}>
        {/* Page heading */}
        <Flex direction="column" gap="200">
          <Heading as="h1" size={{ mobile: 'lg', desktop: 'xl' }}>
            {customerName ? `Welcome back, ${customerName}` : 'Your services'}
          </Heading>
          <BodyText size="md" color="secondary">
            Manage all your UW services in one place.
          </BodyText>
        </Flex>

        {/* Total spend summary */}
        {services.length > 0 && (
          <TotalSpendSummary total={totalSpend} serviceCount={services.length} />
        )}

        {/* Services grid or empty state */}
        {services.length === 0 ? (
          <Card variant="subtle" colorScheme="neutralSubtle">
            <CardContent direction="column" spacing="md">
              <Heading as="h2" size="md">
                No active services
              </Heading>
              <BodyText size="md" color="secondary">
                You don't have any active UW services yet. Get in touch to find out what's
                available for your home.
              </BodyText>
              <CardInteraction asChild>
                <Link href="/services/explore">
                  Explore services
                  <ChevronRightSmallIcon />
                </Link>
              </CardInteraction>
            </CardContent>
          </Card>
        ) : (
          <Grid
            columns={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap={{ mobile: '300', desktop: '400' }}
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </Grid>
        )}
      </Flex>
    </Container>
  );
}

export default ServicesDashboard;
