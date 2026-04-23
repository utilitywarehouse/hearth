import * as React from 'react';
import {
  Card,
  CardContent,
  CardInteraction,
  Alert,
  Flex,
  Heading,
  BodyText,
  DetailText,
  Link,
  IconContainer,
} from '@utilitywarehouse/hearth-react';
import {
  BroadbandMediumIcon,
  ChevronRightSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

export interface BroadbandServiceCardProps {
  /** The name of the broadband package */
  packageName: string;
  /** The monthly cost, e.g. 35.99 */
  monthlyCost: number;
  /** The contract end date */
  contractEndDate: Date;
  /** The URL for the "Manage broadband" link */
  manageHref: string;
  /** Whether the customer's smart hub is offline */
  isSmartHubOffline?: boolean;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function BroadbandServiceCard({
  packageName,
  monthlyCost,
  contractEndDate,
  manageHref,
  isSmartHubOffline = false,
}: BroadbandServiceCardProps) {
  return (
    <Card
      direction="column"
      gap="300"
      shadowColor="broadband"
      colorScheme="neutralStrong"
      variant="emphasis"
    >
      <Flex alignItems="center" gap="200">
        <IconContainer colorScheme="broadband" size="md">
          <BroadbandMediumIcon />
        </IconContainer>
        <Heading as="h2" size="md">
          Broadband
        </Heading>
      </Flex>

      <CardContent direction="column" gap="150" paddingNone>
        <Flex direction="column" gap="50">
          <DetailText size="sm" color="text" as="span">
            Package
          </DetailText>
          <BodyText size="md" weight="semibold">
            {packageName}
          </BodyText>
        </Flex>

        <Flex direction="column" gap="50">
          <DetailText size="sm" color="text" as="span">
            Monthly cost
          </DetailText>
          <BodyText size="md" weight="semibold">
            {formatCurrency(monthlyCost)} / month
          </BodyText>
        </Flex>

        <Flex direction="column" gap="50">
          <DetailText size="sm" color="text" as="span">
            Contract end date
          </DetailText>
          <BodyText size="md" weight="semibold">
            {formatDate(contractEndDate)}
          </BodyText>
        </Flex>
      </CardContent>

      {isSmartHubOffline && (
        <Alert
          colorScheme="warning"
          title="Smart hub offline"
          text="Your smart hub appears to be offline. Please check your router is plugged in and switched on."
        />
      )}

      <CardInteraction asChild>
        <Link href={manageHref}>
          Manage broadband
          <ChevronRightSmallIcon />
        </Link>
      </CardInteraction>
    </Card>
  );
}

BroadbandServiceCard.displayName = 'BroadbandServiceCard';
