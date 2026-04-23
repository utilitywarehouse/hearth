import {
  Badge,
  BodyText,
  Card,
  CardActions,
  CardActionLink,
  CardContent,
  Container,
  Flex,
  Grid,
  Heading,
  IconContainer,
} from '@utilitywarehouse/hearth-react';
import {
  ElectricityMediumIcon,
  BroadbandMediumIcon,
  MobileMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';

interface Service {
  id: string;
  name: string;
  monthlyCost: number;
  manageHref: string;
  colorScheme: 'energy' | 'broadband' | 'mobile';
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    id: 'energy',
    name: 'Energy',
    monthlyCost: 89.5,
    manageHref: '/services/energy',
    colorScheme: 'energy',
    icon: <ElectricityMediumIcon />,
  },
  {
    id: 'broadband',
    name: 'Broadband',
    monthlyCost: 35.0,
    manageHref: '/services/broadband',
    colorScheme: 'broadband',
    icon: <BroadbandMediumIcon />,
  },
  {
    id: 'mobile',
    name: 'Mobile',
    monthlyCost: 22.0,
    manageHref: '/services/mobile',
    colorScheme: 'mobile',
    icon: <MobileMediumIcon />,
  },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}

export function ServicesDashboard() {
  const totalMonthlyCost = services.reduce((sum, service) => sum + service.monthlyCost, 0);

  return (
    <Container paddingY="400" paddingX="300">
      <Flex direction="column" gap="400" width="100%">
        <Flex direction="column" gap="100">
          <Heading as="h1" size="xl">
            Your UW Services
          </Heading>
          <Flex alignItems="center" gap="150" wrap="wrap">
            <BodyText size="md" as="span">
              Total monthly spend:
            </BodyText>
            <Heading as="h2" size="lg">
              {formatCurrency(totalMonthlyCost)}
              <BodyText as="span" size="sm">
                {' '}
                /month
              </BodyText>
            </Heading>
          </Flex>
        </Flex>

        <Grid
          columns={{ mobile: '1', desktop: '3' }}
          gap="300"
          width="100%"
        >
          {services.map(service => (
            <Card key={service.id} colorScheme={service.colorScheme} direction="column">
              <CardContent direction="column" gap="300">
                <Flex alignItems="center" gap="200">
                  <IconContainer colorScheme={service.colorScheme} size="md">
                    {service.icon}
                  </IconContainer>
                  <Flex direction="column" gap="25">
                    <Heading as="h3" size="sm">
                      {service.name}
                    </Heading>
                    <Badge colorScheme={service.colorScheme} variant="subtle">
                      Active
                    </Badge>
                  </Flex>
                </Flex>

                <Flex direction="column" gap="50">
                  <BodyText size="sm" as="p">
                    Monthly cost
                  </BodyText>
                  <Heading as="h4" size="md">
                    {formatCurrency(service.monthlyCost)}
                    <BodyText as="span" size="sm">
                      {' '}
                      /month
                    </BodyText>
                  </Heading>
                </Flex>
              </CardContent>

              <CardActions>
                <CardActionLink href={service.manageHref} heading={`Manage ${service.name}`} />
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Flex>
    </Container>
  );
}
