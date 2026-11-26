import { CSSProperties } from 'react';
import { BodyText, Flex, Heading } from '@utilitywarehouse/hearth-react';
import { ArrowDownMediumIcon, ArrowUpMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const visuallyHidden: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
};

interface UsageTrendProps {
  percentChange: number;
}

export function UsageTrend({ percentChange }: UsageTrendProps) {
  const isUp = percentChange > 0;
  return (
    <Flex direction="column" gap="100">
      <Heading as="h3" size="sm">
        Usage this month
      </Heading>
      <Flex alignItems="center" gap="100">
        {isUp ? <ArrowUpMediumIcon aria-hidden /> : <ArrowDownMediumIcon aria-hidden />}
        <span style={visuallyHidden}>{isUp ? 'Up' : 'Down'}</span>
        <BodyText>{Math.abs(percentChange)}% on last month</BodyText>
      </Flex>
    </Flex>
  );
}
