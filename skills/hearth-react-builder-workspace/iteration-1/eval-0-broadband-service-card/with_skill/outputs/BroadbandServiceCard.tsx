import {
  Alert,
  BodyText,
  Card,
  CardActionLink,
  CardActions,
  CardContent,
  DetailText,
  Divider,
  Flex,
  Heading,
} from '@utilitywarehouse/hearth-react';
import { BroadbandMediumIcon, ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';

export interface BroadbandServiceCardProps {
  /** Name of the broadband package, e.g. "Full Fibre 500" */
  packageName: string;
  /** Monthly cost formatted as a display string, e.g. "£35.00" */
  monthlyCost: string;
  /** Contract end date formatted as a display string, e.g. "31 March 2026" */
  contractEndDate: string;
  /** URL for the "Manage broadband" link */
  manageHref: string;
  /** When true, displays a warning that the smart hub is offline */
  isHubOffline?: boolean;
}

export function BroadbandServiceCard({
  packageName,
  monthlyCost,
  contractEndDate,
  manageHref,
  isHubOffline = false,
}: BroadbandServiceCardProps) {
  return (
    <Card colorScheme="broadband" shadowColor="broadband" aria-labelledby="broadband-card-heading">
      <CardContent direction="column" spacing="md">
        <Heading as="h2" size="md" id="broadband-card-heading">
          {packageName}
        </Heading>

        <Flex direction="column" gap="100">
          <BodyText size="sm" color="secondary">
            Monthly cost
          </BodyText>
          <DetailText size="2xl">{monthlyCost}</DetailText>
          <BodyText size="sm" color="secondary">
            per month
          </BodyText>
        </Flex>

        <Flex direction="column" gap="100">
          <BodyText size="sm" color="secondary">
            Contract ends
          </BodyText>
          <BodyText size="md">{contractEndDate}</BodyText>
        </Flex>

        {isHubOffline && (
          <Alert
            colorScheme="warning"
            title="Smart hub offline"
            text="Your smart hub appears to be offline. Check it's powered on and connected."
          />
        )}
      </CardContent>

      <Divider />

      <CardActions>
        <CardActionLink
          heading="Manage broadband"
          trailingIcon={<ChevronRightSmallIcon />}
          leadingIcon={<BroadbandMediumIcon />}
          leadingIconContainerColorScheme="broadband"
          href={manageHref}
        />
      </CardActions>
    </Card>
  );
}
