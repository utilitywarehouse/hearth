import { CSSProperties } from 'react';
import { Box, BodyText, Button, Flex, Link } from '@utilitywarehouse/hearth-react';

const visuallyHidden: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
};

interface SavingsDisclaimerProps {
  onBack: () => void;
  onContinue: () => void;
}

export function SavingsDisclaimer({ onBack, onContinue }: SavingsDisclaimerProps) {
  return (
    <Flex direction="column" gap="200">
      <BodyText>
        Savings are estimated from your annual usage. Learn more about the{' '}
        <Link asChild>
          <a href="https://www.ofgem.gov.uk/energy-price-cap" target="_blank" rel="noreferrer">
            Energy Price Cap
            <span style={visuallyHidden}> (opens in new tab)</span>
          </a>
        </Link>
        .
      </BodyText>
      <Flex gap="200">
        <Box style={{ flex: 1 }}>
          <Button variant="outline" onClick={onBack} style={{ width: '100%' }}>
            Back
          </Button>
        </Box>
        <Box style={{ flex: 1 }}>
          <Button variant="solid" onClick={onContinue} style={{ width: '100%' }}>
            Continue
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
