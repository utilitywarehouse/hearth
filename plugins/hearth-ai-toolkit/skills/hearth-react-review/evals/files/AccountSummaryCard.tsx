import { Box, Flex, Heading, BodyText, Card, CardContent, Button } from '@utilitywarehouse/hearth-react';
import { WarningMediumIcon } from '@utilitywarehouse/hearth-react-icons';

interface AccountSummaryCardProps {
  balance: string;
  dueDate: string;
  onPayNow: () => void;
}

export function AccountSummaryCard({ balance, dueDate, onPayNow }: AccountSummaryCardProps) {
  return (
    <Card shadow="lg" style={{ padding: '16px' }}>
      <CardContent>
        <Heading>Account summary</Heading>
        <Flex>
          <BodyText marginRight="100">Balance</BodyText>
          <BodyText>£{balance}</BodyText>
        </Flex>
        <Flex>
          <WarningMediumIcon />
          <BodyText>Payment due {dueDate}</BodyText>
        </Flex>
        <Box style={{ backgroundColor: 'var(--h-surface-highlight-subtle)' }}>
          <Button marginLeft="auto" onClick={onPayNow}>
            Pay now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
